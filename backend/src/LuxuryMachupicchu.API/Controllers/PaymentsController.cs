using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using LuxuryMachupicchu.API.DTOs;
using LuxuryMachupicchu.Domain.Entities;
using LuxuryMachupicchu.Infrastructure.Data;

namespace LuxuryMachupicchu.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly LuxuryMachupicchuDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ILogger<PaymentsController> _logger;

    public PaymentsController(
        LuxuryMachupicchuDbContext context,
        IConfiguration configuration,
        IHttpClientFactory httpClientFactory,
        ILogger<PaymentsController> logger)
    {
        _context = context;
        _configuration = configuration;
        _httpClientFactory = httpClientFactory;
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
            booking = await _context.BookingInquiries.FindAsync(dto.BookingId.Value);
            if (booking != null && string.IsNullOrEmpty(referenceCode))
            {
                referenceCode = $"RES-{booking.Id:D4}";
            }
        }

        var description = !string.IsNullOrWhiteSpace(dto.Description)
            ? dto.Description
            : $"Luxury Machupicchu Peru - {referenceCode ?? "Reserva"} ({currency} {dto.Amount:N2})";

        // Prepare Culqi Payload
        var culqiPayload = new
        {
            amount = amountInCents,
            currency_code = currency,
            email = dto.Email.Trim().ToLowerInvariant(),
            source_id = dto.TokenId.Trim(),
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
                    ReferenceCode = referenceCode ?? $"PAY-{DateTime.UtcNow:yyyyMMdd}-{chargeId[^6..]}",
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

                _logger.LogWarning("Culqi charge declined/failed: HTTP {Status}, Code: {Code}, Error: {MerchantMessage}",
                    response.StatusCode, errorCode, merchantMessage);

                return BadRequest(new
                {
                    success = false,
                    error = errorCode,
                    message = !string.IsNullOrWhiteSpace(userMessage) ? userMessage : merchantMessage
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

