using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using LuxuryMachupicchu.API.DTOs;
using LuxuryMachupicchu.Domain.Entities;
using LuxuryMachupicchu.Domain.Interfaces;
using LuxuryMachupicchu.Infrastructure.Data;

namespace LuxuryMachupicchu.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly LuxuryMachupicchuDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IEmailService _emailService;
    private readonly ILogger<PaymentsController> _logger;

    public PaymentsController(
        LuxuryMachupicchuDbContext context,
        IConfiguration configuration,
        IHttpClientFactory httpClientFactory,
        IEmailService emailService,
        ILogger<PaymentsController> logger)
    {
        _context = context;
        _configuration = configuration;
        _httpClientFactory = httpClientFactory;
        _emailService = emailService;
        _logger = logger;
    }

    /// <summary>
    /// Returns public payment configuration including Culqi Public Key and defaults.
    /// Safe for client-side consumption.
    /// </summary>
    [HttpGet("config")]
    [AllowAnonymous]
    public ActionResult<CulqiConfigDto> GetConfig()
    {
        var publicKey = _configuration["CULQI_PUBLIC_KEY"]
            ?? _configuration["CulqiSettings:PublicKey"]
            ?? "pk_test_fU8KVWEiNbyyLHNt";

        return Ok(new CulqiConfigDto
        {
            PublicKey = publicKey,
            CurrencyDefault = "USD",
            BusinessName = "Luxury Machupicchu Peru"
        });
    }

    /// <summary>
    /// Processes a real payment charge through Culqi API using the card token generated in frontend.
    /// </summary>
    [HttpPost("charge")]
    [AllowAnonymous]
    [EnableRateLimiting("contact-policy")]
    public async Task<ActionResult<CulqiChargeResponseDto>> ProcessCharge([FromBody] CulqiChargeRequestDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var secretKey = _configuration["CULQI_SECRET_KEY"]
            ?? _configuration["CulqiSettings:SecretKey"]
            ?? "sk_test_BLb8scQqQ0nWUlzU";

        if (string.IsNullOrWhiteSpace(secretKey))
        {
            _logger.LogError("Culqi Secret Key is not configured in server settings.");
            return StatusCode(500, new { message = "Error de configuración de pasarela en el servidor." });
        }

        var currency = (dto.Currency ?? "USD").ToUpperInvariant();
        if (currency != "USD" && currency != "PEN")
        {
            return BadRequest(new { message = "Moneda no soportada. Use 'USD' o 'PEN'." });
        }

        // Convert amount to cents as required by Culqi (e.g. $100.50 -> 10050)
        var amountInCents = (int)Math.Round(dto.Amount * 100m, MidpointRounding.AwayFromZero);
        if (amountInCents <= 0)
        {
            return BadRequest(new { message = "El monto a cobrar debe ser mayor a cero." });
        }

        var referenceCode = dto.ReferenceCode;
        BookingInquiry? booking = null;
        if (dto.BookingId.HasValue)
        {
            booking = await _context.BookingInquiries.Include(b => b.Tour).FirstOrDefaultAsync(b => b.Id == dto.BookingId.Value);
            if (booking != null && string.IsNullOrEmpty(referenceCode))
            {
                referenceCode = $"RES-{booking.Id:D4}";
            }
        }

        var cleanRef = !string.IsNullOrWhiteSpace(referenceCode)
            ? System.Text.RegularExpressions.Regex.Replace(referenceCode, @"[^a-zA-Z0-9\-_]", "").Trim()
            : "RESERVA";
        if (cleanRef.Length > 20) cleanRef = cleanRef[..20];

        var description = $"Reserva {cleanRef} - Luxury Machupicchu Peru";
        if (description.Length > 80) description = description[..80];

        // Prepare Culqi Payload
        var culqiPayload = new
        {
            amount = amountInCents,
            currency_code = currency,
            email = dto.Email.Trim().ToLowerInvariant(),
            source_id = dto.TokenId.Trim(),
            capture = true,
            description = description,
            metadata = new Dictionary<string, string>
            {
                ["reference_code"] = referenceCode ?? "N/A",
                ["booking_id"] = dto.BookingId?.ToString() ?? "",
                ["customer_name"] = dto.CustomerName ?? "",
                ["customer_phone"] = dto.CustomerPhone ?? "",
                ["is_deposit"] = dto.IsDepositOnly.ToString()
            }
        };

        var client = _httpClientFactory.CreateClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", secretKey);
        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        var jsonContent = new StringContent(JsonSerializer.Serialize(culqiPayload), Encoding.UTF8, "application/json");

        try
        {
            _logger.LogInformation("Sending charge request to Culqi for amount {Amount} {Currency}, token: {Token}",
                amountInCents, currency, dto.TokenId[..Math.Min(12, dto.TokenId.Length)] + "...");

            var response = await client.PostAsync("https://api.culqi.com/v2/charges", jsonContent);
            var responseBody = await response.Content.ReadAsStringAsync();

            using var doc = JsonDocument.Parse(responseBody);
            var root = doc.RootElement;

            if (response.IsSuccessStatusCode)
            {
                // Culqi success charge
                var chargeId = root.TryGetProperty("id", out var idProp) ? idProp.GetString() ?? "" : "";

                // If Culqi returned 200 without a charge ID (e.g. 3DS review or challenge required)
                if (string.IsNullOrWhiteSpace(chargeId))
                {
                    var reviewMsg = root.TryGetProperty("user_message", out var uProp)
                        ? uProp.GetString()
                        : "La transacción requiere autenticación adicional con su entidad bancaria (3D Secure). Por favor intente con una tarjeta autorizada.";
                    _logger.LogWarning("Culqi returned 200 without charge ID (3DS Review required): {Raw}", responseBody);
                    return BadRequest(new { success = false, message = reviewMsg, actionCode = "REVIEW" });
                }

                var authCode = "";
                var cardBrand = "Tarjeta";
                var cardLastFour = "";
                var userMessage = "Pago procesado exitosamente.";

                if (root.TryGetProperty("outcome", out var outcomeProp))
                {
                    if (outcomeProp.TryGetProperty("code", out var codeProp)) authCode = codeProp.GetString() ?? "";
                    if (outcomeProp.TryGetProperty("user_message", out var msgProp)) userMessage = msgProp.GetString() ?? userMessage;
                }

                if (root.TryGetProperty("source", out var sourceProp))
                {
                    if (sourceProp.TryGetProperty("iin", out var iinProp) && iinProp.TryGetProperty("card_brand", out var brandProp))
                    {
                        cardBrand = brandProp.GetString() ?? cardBrand;
                    }
                    if (sourceProp.TryGetProperty("card_number", out var cardProp))
                    {
                        var fullCard = cardProp.GetString() ?? "";
                        cardLastFour = fullCard.Length >= 4 ? fullCard[^4..] : "";
                    }
                }

                // Record in Database
                var transaction = new PaymentTransaction
                {
                    CulqiChargeId = chargeId,
                    CulqiAuthorizationCode = authCode,
                    ReferenceType = dto.BookingId.HasValue ? "Booking" : (dto.ConciergeRequestId.HasValue ? "ConciergeQuote" : "Custom"),
                    ReferenceCode = referenceCode ?? $"PAY-{DateTime.UtcNow:yyyyMMdd}-{chargeId[^Math.Min(6, chargeId.Length)..]}",
                    BookingId = dto.BookingId,
                    ConciergeRequestId = dto.ConciergeRequestId,
                    CustomerName = dto.CustomerName ?? (booking?.FullName ?? "Huésped"),
                    CustomerEmail = dto.Email,
                    CustomerPhone = dto.CustomerPhone ?? (booking?.Phone ?? ""),
                    Amount = dto.Amount,
                    Currency = currency,
                    PaymentMethod = $"Culqi_{cardBrand}",
                    CardBrand = cardBrand,
                    CardLastFour = cardLastFour,
                    Status = "Paid",
                    RawResponseJson = responseBody,
                    CreatedAt = DateTime.UtcNow
                };

                await _context.PaymentTransactions.AddAsync(transaction);

                // Update booking status if linked
                if (booking != null)
                {
                    booking.Status = dto.IsDepositOnly ? "Confirmed" : "Paid";
                    var paymentNote = $" [Culqi {currency} {dto.Amount:N2} - Auth: {authCode} - Ref: {chargeId}]";
                    booking.SpecialRequests = (booking.SpecialRequests + paymentNote).Trim();
                }

                await _context.SaveChangesAsync();

                _logger.LogInformation("Culqi charge successful: {ChargeId}, Auth: {AuthCode}, Amount: {Amount} {Currency}",
                    chargeId, authCode, dto.Amount, currency);

                // Trigger transactional emails asynchronously without blocking response
                _ = Task.Run(async () =>
                {
                    try
                    {
                        await _emailService.SendPaymentConfirmationAsync(booking, transaction);
                        await _emailService.SendConciergePaymentNotificationAsync(booking, transaction);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error dispatching transactional confirmation email for Charge {ChargeId}", chargeId);
                    }
                });

                return Ok(new CulqiChargeResponseDto
                {
                    Success = true,
                    ChargeId = chargeId,
                    AuthorizationCode = authCode,
                    Amount = dto.Amount,
                    Currency = currency,
                    CardBrand = cardBrand,
                    CardLastFour = cardLastFour,
                    Status = "Paid",
                    Message = userMessage,
                    TransactionDate = transaction.CreatedAt,
                    BookingId = dto.BookingId,
                    ReferenceCode = transaction.ReferenceCode
                });
            }
            else
            {
                // Culqi returned an error (e.g. invalid card, insufficient funds)
                var userMessage = "No se pudo procesar la transacción.";
                var merchantMessage = "";
                var errorCode = "";

                if (root.TryGetProperty("user_message", out var uMsg)) userMessage = uMsg.GetString() ?? userMessage;
                if (root.TryGetProperty("merchant_message", out var mMsg)) merchantMessage = mMsg.GetString() ?? "";
                if (root.TryGetProperty("code", out var cCode)) errorCode = cCode.GetString() ?? "";

                _logger.LogWarning("Culqi charge declined/failed: HTTP {Status}, Code: {Code}, Error: {MerchantMessage}, UserMessage: {UserMessage}, Raw: {Raw}",
                    response.StatusCode, errorCode, merchantMessage, userMessage, responseBody);

                var finalMessage = !string.IsNullOrWhiteSpace(merchantMessage)
                    ? $"{userMessage} ({merchantMessage})"
                    : userMessage;

                return BadRequest(new
                {
                    success = false,
                    error = errorCode,
                    code = errorCode,
                    merchant_message = merchantMessage,
                    user_message = userMessage,
                    message = finalMessage
                });
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error communicating with Culqi API");
            return StatusCode(500, new
            {
                success = false,
                message = "Error interno al conectar con la pasarela de pagos. Por favor intente nuevamente o contacte a Concierge."
            });
        }
    }

    /// <summary>
    /// Webhook endpoint for Culqi asynchronous events (e.g. charge.creation.succeeded, charge.creation.failed).
    /// Does not require JWT authentication; parses and validates Culqi payload.
    /// </summary>
    [HttpPost("webhook")]
    [AllowAnonymous]
    public async Task<IActionResult> HandleWebhook()
    {
        string rawBody;
        using (var reader = new StreamReader(Request.Body, Encoding.UTF8))
        {
            rawBody = await reader.ReadToEndAsync();
        }

        if (string.IsNullOrWhiteSpace(rawBody))
        {
            _logger.LogWarning("Culqi webhook received with empty body.");
            return BadRequest(new { message = "Payload vacío." });
        }

        try
        {
            using var doc = JsonDocument.Parse(rawBody);
            var root = doc.RootElement;

            var eventType = root.TryGetProperty("type", out var typeProp) ? typeProp.GetString() ?? "" : "";
            var eventId = root.TryGetProperty("id", out var idProp) ? idProp.GetString() ?? "" : "";

            _logger.LogInformation("Culqi webhook received. Event: {EventType}, EventId: {EventId}", eventType, eventId);

            if (string.IsNullOrWhiteSpace(eventType))
            {
                return BadRequest(new { message = "Formato de evento inválido: falta campo 'type'." });
            }

            // Extract the charge data element (Culqi may send 'data' as an object or serialized JSON string)
            JsonElement dataElement;
            if (root.TryGetProperty("data", out var dProp))
            {
                if (dProp.ValueKind == JsonValueKind.String)
                {
                    using var nestedDoc = JsonDocument.Parse(dProp.GetString() ?? "{}");
                    dataElement = nestedDoc.RootElement.Clone();
                }
                else
                {
                    dataElement = dProp.Clone();
                }
            }
            else
            {
                dataElement = root.Clone();
            }

            var chargeId = dataElement.TryGetProperty("id", out var cIdProp) ? cIdProp.GetString() ?? "" : "";

            // 1. Process Event: charge.creation.succeeded
            if (eventType.Equals("charge.creation.succeeded", StringComparison.OrdinalIgnoreCase))
            {
                decimal amount = 0;
                if (dataElement.TryGetProperty("amount", out var amtProp))
                {
                    if (amtProp.ValueKind == JsonValueKind.Number)
                    {
                        amount = amtProp.GetInt64() / 100m;
                    }
                    else if (decimal.TryParse(amtProp.GetString(), out var parsedAmt))
                    {
                        amount = parsedAmt / 100m;
                    }
                }

                var currency = dataElement.TryGetProperty("currency_code", out var curProp) ? curProp.GetString() ?? "USD" : "USD";
                var email = dataElement.TryGetProperty("email", out var emailProp) ? emailProp.GetString() ?? "" : "";

                var authCode = "";
                if (dataElement.TryGetProperty("outcome", out var outcomeProp))
                {
                    if (outcomeProp.TryGetProperty("code", out var codeProp)) authCode = codeProp.GetString() ?? "";
                }

                var cardBrand = "Tarjeta";
                var cardLastFour = "";
                if (dataElement.TryGetProperty("source", out var srcProp))
                {
                    if (srcProp.TryGetProperty("iin", out var iinProp) && iinProp.TryGetProperty("card_brand", out var bProp))
                    {
                        cardBrand = bProp.GetString() ?? cardBrand;
                    }
                    if (srcProp.TryGetProperty("card_number", out var cnProp))
                    {
                        var fullCard = cnProp.GetString() ?? "";
                        cardLastFour = fullCard.Length >= 4 ? fullCard[^4..] : "";
                    }
                }

                // Extract Metadata if available
                string? referenceCode = null;
                int? bookingId = null;
                string? customerName = null;
                string? customerPhone = null;

                if (dataElement.TryGetProperty("metadata", out var metaProp) && metaProp.ValueKind == JsonValueKind.Object)
                {
                    if (metaProp.TryGetProperty("reference_code", out var refP)) referenceCode = refP.GetString();
                    if (metaProp.TryGetProperty("booking_id", out var bIdP))
                    {
                        if (int.TryParse(bIdP.GetString(), out var parsedBId)) bookingId = parsedBId;
                    }
                    if (metaProp.TryGetProperty("customer_name", out var cNameP)) customerName = cNameP.GetString();
                    if (metaProp.TryGetProperty("customer_phone", out var cPhoneP)) customerPhone = cPhoneP.GetString();
                }

                // Look up linked booking
                BookingInquiry? booking = null;
                if (bookingId.HasValue)
                {
                    booking = await _context.BookingInquiries.Include(b => b.Tour).FirstOrDefaultAsync(b => b.Id == bookingId.Value);
                }

                if (booking == null && !string.IsNullOrWhiteSpace(referenceCode))
                {
                    if (referenceCode.StartsWith("RES-", StringComparison.OrdinalIgnoreCase) &&
                        int.TryParse(referenceCode.AsSpan(4), out var parsedRefId))
                    {
                        booking = await _context.BookingInquiries.Include(b => b.Tour).FirstOrDefaultAsync(b => b.Id == parsedRefId);
                    }
                }

                if (booking != null && string.IsNullOrWhiteSpace(referenceCode))
                {
                    referenceCode = $"RES-{booking.Id:D4}";
                }

                // Check if transaction was already registered
                var existingTx = await _context.PaymentTransactions.FirstOrDefaultAsync(t => t.CulqiChargeId == chargeId);
                if (existingTx == null)
                {
                    existingTx = new PaymentTransaction
                    {
                        CulqiChargeId = chargeId,
                        CulqiAuthorizationCode = authCode,
                        ReferenceType = booking != null ? "Booking" : "WebhookDirect",
                        ReferenceCode = referenceCode ?? (booking != null ? $"RES-{booking.Id:D4}" : $"PAY-{DateTime.UtcNow:yyyyMMdd}-{chargeId[^Math.Min(6, chargeId.Length)..]}"),
                        BookingId = booking?.Id,
                        CustomerName = customerName ?? (booking?.FullName ?? "Huésped"),
                        CustomerEmail = !string.IsNullOrWhiteSpace(email) ? email : (booking?.Email ?? ""),
                        CustomerPhone = customerPhone ?? (booking?.Phone ?? ""),
                        Amount = amount,
                        Currency = currency,
                        PaymentMethod = $"Culqi_{cardBrand}",
                        CardBrand = cardBrand,
                        CardLastFour = cardLastFour,
                        Status = "Paid",
                        RawResponseJson = rawBody,
                        CreatedAt = DateTime.UtcNow
                    };

                    await _context.PaymentTransactions.AddAsync(existingTx);
                }
                else
                {
                    existingTx.Status = "Paid";
                    if (!string.IsNullOrWhiteSpace(authCode)) existingTx.CulqiAuthorizationCode = authCode;
                }

                // Update booking status
                if (booking != null)
                {
                    booking.Status = "Paid";
                    var note = $" [Webhook Culqi {currency} {amount:N2} - Auth: {authCode} - Ref: {chargeId}]";
                    if (string.IsNullOrWhiteSpace(booking.SpecialRequests) || !booking.SpecialRequests.Contains(chargeId))
                    {
                        booking.SpecialRequests = (booking.SpecialRequests + note).Trim();
                    }
                }

                await _context.SaveChangesAsync();

                _logger.LogInformation("Culqi webhook success processed: Charge {ChargeId}, Booking {BookingId}, Amount {Amount} {Currency}",
                    chargeId, booking?.Id, amount, currency);

                // Dispatch confirmation email
                _ = Task.Run(async () =>
                {
                    try
                    {
                        await _emailService.SendPaymentConfirmationAsync(booking, existingTx);
                        await _emailService.SendConciergePaymentNotificationAsync(booking, existingTx);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Error dispatching emails for Webhook Charge {ChargeId}", chargeId);
                    }
                });

                return Ok(new CulqiWebhookResponseDto
                {
                    Success = true,
                    Message = "Evento charge.creation.succeeded procesado exitosamente.",
                    EventType = eventType,
                    ChargeId = chargeId,
                    ReferenceCode = existingTx.ReferenceCode,
                    BookingStatus = booking?.Status ?? "N/A"
                });
            }

            // 2. Process Event: charge.creation.failed
            else if (eventType.Equals("charge.creation.failed", StringComparison.OrdinalIgnoreCase))
            {
                var userMessage = "El cobro fue declinado.";
                if (dataElement.TryGetProperty("outcome", out var outcomeProp) &&
                    outcomeProp.TryGetProperty("user_message", out var uMsgProp))
                {
                    userMessage = uMsgProp.GetString() ?? userMessage;
                }

                string? referenceCode = null;
                int? bookingId = null;
                if (dataElement.TryGetProperty("metadata", out var metaProp) && metaProp.ValueKind == JsonValueKind.Object)
                {
                    if (metaProp.TryGetProperty("reference_code", out var refP)) referenceCode = refP.GetString();
                    if (metaProp.TryGetProperty("booking_id", out var bIdP))
                    {
                        if (int.TryParse(bIdP.GetString(), out var parsedBId)) bookingId = parsedBId;
                    }
                }

                BookingInquiry? booking = null;
                if (bookingId.HasValue)
                {
                    booking = await _context.BookingInquiries.FindAsync(bookingId.Value);
                }
                if (booking == null && !string.IsNullOrWhiteSpace(referenceCode))
                {
                    if (referenceCode.StartsWith("RES-", StringComparison.OrdinalIgnoreCase) &&
                        int.TryParse(referenceCode.AsSpan(4), out var parsedRefId))
                    {
                        booking = await _context.BookingInquiries.FindAsync(parsedRefId);
                    }
                }

                if (booking != null)
                {
                    booking.Status = "PaymentFailed";
                    var note = $" [Fallo Culqi: {userMessage} - Ref: {chargeId}]";
                    booking.SpecialRequests = (booking.SpecialRequests + note).Trim();
                }

                // Record failed transaction attempt
                var existingTx = await _context.PaymentTransactions.FirstOrDefaultAsync(t => t.CulqiChargeId == chargeId);
                if (existingTx == null && !string.IsNullOrWhiteSpace(chargeId))
                {
                    existingTx = new PaymentTransaction
                    {
                        CulqiChargeId = chargeId,
                        CulqiAuthorizationCode = "DECLINED",
                        ReferenceType = booking != null ? "Booking" : "WebhookDirect",
                        ReferenceCode = referenceCode ?? (booking != null ? $"RES-{booking.Id:D4}" : $"FAIL-{DateTime.UtcNow:yyyyMMdd}"),
                        BookingId = booking?.Id,
                        CustomerName = booking?.FullName ?? "Huésped",
                        CustomerEmail = booking?.Email ?? "",
                        CustomerPhone = booking?.Phone ?? "",
                        Amount = 0,
                        Currency = "USD",
                        PaymentMethod = "Culqi_Failed",
                        Status = "Failed",
                        RawResponseJson = rawBody,
                        CreatedAt = DateTime.UtcNow
                    };
                    await _context.PaymentTransactions.AddAsync(existingTx);
                }
                else if (existingTx != null)
                {
                    existingTx.Status = "Failed";
                }

                await _context.SaveChangesAsync();

                _logger.LogWarning("Culqi webhook failure recorded: Charge {ChargeId}, Booking {BookingId}, Reason: {Reason}",
                    chargeId, booking?.Id, userMessage);

                return Ok(new CulqiWebhookResponseDto
                {
                    Success = false,
                    Message = $"Evento charge.creation.failed registrado: {userMessage}",
                    EventType = eventType,
                    ChargeId = chargeId,
                    ReferenceCode = referenceCode,
                    BookingStatus = booking?.Status ?? "PaymentFailed"
                });
            }

            // Other events (e.g. refund, token created) are acknowledged safely
            _logger.LogInformation("Culqi webhook unhandled event type: {EventType}. Acknowledged.", eventType);
            return Ok(new
            {
                success = true,
                message = $"Evento '{eventType}' recibido y reconocido.",
                eventType = eventType
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error processing Culqi webhook payload.");
            return StatusCode(500, new { success = false, message = "Error interno procesando webhook." });
        }
    }

    /// <summary>
    /// Admin endpoint: returns list of all Culqi payment transactions with search and filter.
    /// </summary>
    [HttpGet("transactions")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<PaymentTransactionDto>>> GetTransactions([FromQuery] string? search = null)
    {
        var query = _context.PaymentTransactions.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim().ToLowerInvariant();
            query = query.Where(t =>
                t.CulqiChargeId.ToLower().Contains(s) ||
                t.CulqiAuthorizationCode.ToLower().Contains(s) ||
                t.ReferenceCode.ToLower().Contains(s) ||
                t.CustomerName.ToLower().Contains(s) ||
                t.CustomerEmail.ToLower().Contains(s));
        }

        var list = await query
            .OrderByDescending(t => t.CreatedAt)
            .Take(100)
            .Select(t => new PaymentTransactionDto
            {
                Id = t.Id,
                CulqiChargeId = t.CulqiChargeId,
                CulqiAuthorizationCode = t.CulqiAuthorizationCode,
                ReferenceType = t.ReferenceType,
                ReferenceCode = t.ReferenceCode,
                BookingId = t.BookingId,
                CustomerName = t.CustomerName,
                CustomerEmail = t.CustomerEmail,
                CustomerPhone = t.CustomerPhone,
                Amount = t.Amount,
                Currency = t.Currency,
                PaymentMethod = t.PaymentMethod,
                CardBrand = t.CardBrand,
                CardLastFour = t.CardLastFour,
                Status = t.Status,
                CreatedAt = t.CreatedAt
            })
            .ToListAsync();

        return Ok(list);
    }

    /// <summary>
    /// Gets payment transactions associated with a specific booking.
    /// </summary>
    [HttpGet("booking/{bookingId}")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<PaymentTransactionDto>>> GetBookingPayments(int bookingId)
    {
        var list = await _context.PaymentTransactions
            .Where(t => t.BookingId == bookingId)
            .OrderByDescending(t => t.CreatedAt)
            .Select(t => new PaymentTransactionDto
            {
                Id = t.Id,
                CulqiChargeId = t.CulqiChargeId,
                CulqiAuthorizationCode = t.CulqiAuthorizationCode,
                ReferenceType = t.ReferenceType,
                ReferenceCode = t.ReferenceCode,
                BookingId = t.BookingId,
                CustomerName = t.CustomerName,
                CustomerEmail = t.CustomerEmail,
                CustomerPhone = t.CustomerPhone,
                Amount = t.Amount,
                Currency = t.Currency,
                PaymentMethod = t.PaymentMethod,
                CardBrand = t.CardBrand,
                CardLastFour = t.CardLastFour,
                Status = t.Status,
                CreatedAt = t.CreatedAt
            })
            .ToListAsync();

        return Ok(list);
    }

    /// <summary>
    /// Generates a payment preference link for a booking or tour deposit (30% or custom amount)
    /// directing to the Culqi Checkout payment portal.
    /// </summary>
    [HttpPost("create-deposit-preference")]
    [AllowAnonymous]
    public IActionResult CreateDepositPreference([FromBody] DepositPreferenceRequest request)
    {
        var depositPercent = 0.30m; // 30% luxury reservation deposit
        var depositAmount = Math.Round(request.TotalAmount * depositPercent, 2);
        var currency = (request.Currency ?? "USD").ToUpperInvariant();
        var prefId = "LMP-DEP-" + Guid.NewGuid().ToString()[..8].ToUpper();

        var bookingParam = request.BookingId.HasValue ? $"&bookingId={request.BookingId.Value}" : "";
        var emailParam = !string.IsNullOrWhiteSpace(request.GuestEmail) ? $"&email={Uri.EscapeDataString(request.GuestEmail)}" : "";
        var titleParam = !string.IsNullOrWhiteSpace(request.TourTitle) ? $"&title={Uri.EscapeDataString(request.TourTitle)}" : "";

        var checkoutUrl = $"/checkout.html?pref={prefId}&amount={depositAmount}&currency={currency}{bookingParam}{emailParam}{titleParam}";

        _logger.LogInformation("Generated Culqi checkout link for {TourTitle}. Amount: {Amount} {Currency}", request.TourTitle, depositAmount, currency);

        return Ok(new
        {
            preferenceId = prefId,
            depositAmount,
            currency,
            checkoutUrl,
            mode = "culqi"
        });
    }
}
