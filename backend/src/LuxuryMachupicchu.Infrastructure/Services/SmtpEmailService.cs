using System.Net;
using System.Net.Mail;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using LuxuryMachupicchu.Domain.Entities;
using LuxuryMachupicchu.Domain.Interfaces;

namespace LuxuryMachupicchu.Infrastructure.Services;

public class SmtpEmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<SmtpEmailService> _logger;

    public SmtpEmailService(IConfiguration configuration, ILogger<SmtpEmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task<bool> SendEmailAsync(string toEmail, string subject, string htmlBody, string? toName = null)
    {
        if (string.IsNullOrWhiteSpace(toEmail))
        {
            _logger.LogWarning("SendEmailAsync called with empty recipient address.");
            return false;
        }

        var host = _configuration["SMTP_HOST"]
            ?? _configuration["SmtpSettings:Host"];
            
        var portStr = _configuration["SMTP_PORT"]
            ?? _configuration["SmtpSettings:Port"]
            ?? "587";
        _ = int.TryParse(portStr, out var port);
        if (port <= 0) port = 587;

        var user = _configuration["SMTP_USER"]
            ?? _configuration["SmtpSettings:Username"];
            
        var pass = _configuration["SMTP_PASSWORD"]
            ?? _configuration["SmtpSettings:Password"];
            
        var fromEmail = _configuration["SMTP_FROM_EMAIL"]
            ?? _configuration["SmtpSettings:FromEmail"]
            ?? "info@lmptravel.com";
            
        var fromName = _configuration["SMTP_FROM_NAME"]
            ?? _configuration["SmtpSettings:FromName"]
            ?? "Luxury Machupicchu Peru Concierge";

        var enableSslStr = _configuration["SMTP_ENABLE_SSL"]
            ?? _configuration["SmtpSettings:EnableSsl"]
            ?? "true";
        _ = bool.TryParse(enableSslStr, out var enableSsl);

        // If SMTP host is unconfigured or set to mock/localhost without credentials, log and simulate
        if (string.IsNullOrWhiteSpace(host) || host.Equals("localhost", StringComparison.OrdinalIgnoreCase) && string.IsNullOrWhiteSpace(user))
        {
            _logger.LogInformation("[SMTP Simulation] Email queued (SMTP host not configured). To: {ToEmail}, Subject: {Subject}", toEmail, subject);
            return true;
        }

        try
        {
            using var message = new MailMessage
            {
                From = new MailAddress(fromEmail, fromName, Encoding.UTF8),
                Subject = subject,
                Body = htmlBody,
                IsBodyHtml = true,
                BodyEncoding = Encoding.UTF8,
                SubjectEncoding = Encoding.UTF8
            };

            if (!string.IsNullOrWhiteSpace(toName))
            {
                message.To.Add(new MailAddress(toEmail.Trim(), toName.Trim(), Encoding.UTF8));
            }
            else
            {
                message.To.Add(new MailAddress(toEmail.Trim()));
            }

            using var client = new SmtpClient(host, port)
            {
                EnableSsl = enableSsl,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Timeout = 15000
            };

            if (!string.IsNullOrWhiteSpace(user) && !string.IsNullOrWhiteSpace(pass))
            {
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(user.Trim(), pass.Trim());
            }

            await client.SendMailAsync(message);
            _logger.LogInformation("Transactional email successfully sent to {ToEmail}. Subject: {Subject}", toEmail, subject);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email to {ToEmail}. Host: {Host}:{Port}, Error: {Error}", toEmail, host, port, ex.Message);
            return false;
        }
    }

    public async Task<bool> SendPaymentConfirmationAsync(BookingInquiry? booking, PaymentTransaction transaction)
    {
        var recipientEmail = !string.IsNullOrWhiteSpace(transaction.CustomerEmail)
            ? transaction.CustomerEmail
            : (booking?.Email ?? "");

        if (string.IsNullOrWhiteSpace(recipientEmail))
        {
            _logger.LogWarning("No recipient email found for payment confirmation. Transaction: {TxCode}", transaction.ReferenceCode);
            return false;
        }

        var customerName = !string.IsNullOrWhiteSpace(transaction.CustomerName)
            ? transaction.CustomerName
            : (booking?.FullName ?? "Estimado Huésped");

        var tourTitle = booking?.Tour?.TitleEs 
            ?? booking?.Tour?.TitleEn 
            ?? "Expedición Privada de Lujo - Machu Picchu";

        var travelDate = booking?.TravelDate.HasValue == true
            ? booking.TravelDate.Value.ToString("dd 'de' MMMM, yyyy")
            : "Coordinación personalizada con Concierge";

        var subject = $"✦ Confirmación de Pago y Voucher Oficial: {transaction.ReferenceCode} - Luxury Machupicchu Peru";

        var html = $@"<!DOCTYPE html>
<html lang=""es"">
<head>
  <meta charset=""UTF-8"">
  <title>Voucher de Pago Oficial - Luxury Machupicchu Peru</title>
  <style>
    body {{
      margin: 0;
      padding: 0;
      background-color: #0b0d13;
      font-family: 'Georgia', 'Times New Roman', serif;
      color: #e5e5e5;
      -webkit-font-smoothing: antialiased;
    }}
    .email-wrapper {{
      width: 100%;
      background-color: #0b0d13;
      padding: 30px 10px;
    }}
    .container {{
      max-width: 650px;
      margin: 0 auto;
      background-color: #12151e;
      border: 1px solid #c59b27;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.7);
    }}
    .header {{
      background: linear-gradient(180deg, #181d29 0%, #0e1118 100%);
      padding: 35px 25px;
      text-align: center;
      border-bottom: 2px solid #d4af37;
    }}
    .brand-title {{
      font-size: 20px;
      letter-spacing: 5px;
      color: #d4af37;
      text-transform: uppercase;
      margin: 0;
      font-weight: 400;
    }}
    .brand-subtitle {{
      font-size: 11px;
      letter-spacing: 3px;
      color: #a3a3a3;
      margin-top: 5px;
      text-transform: uppercase;
    }}
    .pedigree-badge {{
      display: inline-block;
      margin-top: 15px;
      padding: 4px 12px;
      font-size: 10px;
      letter-spacing: 1.5px;
      color: #d4af37;
      border: 1px solid rgba(212, 175, 55, 0.4);
      border-radius: 20px;
      background-color: rgba(212, 175, 55, 0.08);
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }}
    .content {{
      padding: 35px 30px;
      font-family: 'Georgia', serif;
      line-height: 1.6;
    }}
    .salutation {{
      font-size: 17px;
      color: #ffffff;
      margin-bottom: 20px;
    }}
    .lead-text {{
      font-size: 14px;
      color: #c9cbcf;
      margin-bottom: 25px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }}
    .voucher-card {{
      background-color: #181c27;
      border: 1px solid rgba(212, 175, 55, 0.35);
      border-radius: 4px;
      padding: 22px;
      margin-bottom: 30px;
    }}
    .voucher-header {{
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(212, 175, 55, 0.2);
      padding-bottom: 12px;
      margin-bottom: 15px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }}
    .voucher-code {{
      font-size: 18px;
      font-weight: bold;
      color: #d4af37;
      letter-spacing: 1.5px;
    }}
    .voucher-status {{
      background-color: rgba(34, 197, 94, 0.15);
      color: #4ade80;
      border: 1px solid rgba(34, 197, 94, 0.3);
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
    }}
    .detail-table {{
      width: 100%;
      border-collapse: collapse;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 13px;
    }}
    .detail-table td {{
      padding: 8px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }}
    .detail-label {{
      color: #8c9099;
      width: 40%;
    }}
    .detail-value {{
      color: #ffffff;
      font-weight: 500;
      text-align: right;
    }}
    .total-highlight {{
      font-size: 17px;
      color: #d4af37 !important;
      font-weight: bold !important;
    }}
    .concierge-box {{
      background-color: rgba(212, 175, 55, 0.05);
      border-left: 3px solid #d4af37;
      padding: 16px 20px;
      margin-bottom: 25px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 13px;
      color: #dedede;
    }}
    .cta-button {{
      display: block;
      width: fit-content;
      margin: 25px auto;
      background: linear-gradient(135deg, #d4af37 0%, #aa8420 100%);
      color: #0c0e14;
      text-decoration: none;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      padding: 14px 28px;
      border-radius: 2px;
    }}
    .footer {{
      background-color: #0c0e14;
      padding: 25px 30px;
      text-align: center;
      border-top: 1px solid rgba(255,255,255,0.08);
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 11px;
      color: #71757e;
      line-height: 1.7;
    }}
  </style>
</head>
<body>
  <div class=""email-wrapper"">
    <div class=""container"">
      <div class=""header"">
        <h1 class=""brand-title"">LUXURY MACHUPICCHU</h1>
        <div class=""brand-subtitle"">PERU &bull; PRIVATE EXPEDITIONS</div>
        <div class=""pedigree-badge"">GERCETUR CERTIFIED &bull; MINCETUR LICENSED &bull; RUC: 20601622492</div>
      </div>
      <div class=""content"">
        <div class=""salutation"">Estimado/a {customerName},</div>
        <p class=""lead-text"">
          Es un placer confirmar que su pago ha sido procesado exitosamente a través de nuestra pasarela de pagos segura. Su reservación de expedición privada a los Andes peruanos ha sido formalmente acreditada en nuestro sistema.
        </p>

        <div class=""voucher-card"">
          <div class=""voucher-header"">
            <span class=""voucher-code"">{transaction.ReferenceCode}</span>
            <span class=""voucher-status"">&#10003; PAGO CONFIRMADO</span>
          </div>

          <table class=""detail-table"">
            <tr>
              <td class=""detail-label"">Experiencia:</td>
              <td class=""detail-value"">{tourTitle}</td>
            </tr>
            <tr>
              <td class=""detail-label"">Fecha Estimada:</td>
              <td class=""detail-value"">{travelDate}</td>
            </tr>
            <tr>
              <td class=""detail-label"">Tren de Lujo:</td>
              <td class=""detail-value"">{booking?.TrainPreference ?? "Belmond Hiram Bingham"}</td>
            </tr>
            <tr>
              <td class=""detail-label"">Número de Huéspedes:</td>
              <td class=""detail-value"">{booking?.NumberOfGuests ?? 2} Personas</td>
            </tr>
            <tr>
              <td class=""detail-label"">Método de Pago:</td>
              <td class=""detail-value"">{transaction.CardBrand} **** {transaction.CardLastFour}</td>
            </tr>
            <tr>
              <td class=""detail-label"">Código de Autorización:</td>
              <td class=""detail-value"">{transaction.CulqiAuthorizationCode}</td>
            </tr>
            <tr>
              <td class=""detail-label"">ID de Cargo Culqi:</td>
              <td class=""detail-value"">{transaction.CulqiChargeId}</td>
            </tr>
            <tr>
              <td class=""detail-label"">Total Abonado:</td>
              <td class=""detail-value total-highlight"">{transaction.Currency} {transaction.Amount:N2}</td>
            </tr>
          </table>
        </div>

        <div class=""concierge-box"">
          <strong style=""color:#d4af37; display:block; margin-bottom:5px;"">✦ Su Concierge Personal de Viaje</strong>
          Un anfitrión privado de Luxury Machupicchu Peru ha sido asignado a su itinerario. Se comunicará directamente con usted vía WhatsApp o llamada telefónica para afinar sus traslados privados, preferencias gastronómicas y emisión de boletos preferenciales para el Santuario de Machu Picchu.
        </div>

        <a href=""https://wa.me/51958195840?text=Hola%20Luxury%20Machupicchu,%20he%20confirmado%20el%20pago%20de%20mi%20reserva%20{transaction.ReferenceCode}"" class=""cta-button"">
          Contactar a Concierge por WhatsApp
        </a>
      </div>

      <div class=""footer"">
        <p style=""margin: 0 0 8px 0;"">
          <strong>Luxury Machupicchu Peru E.I.R.L</strong> &bull; Portal de Panes 123, Plaza de Armas, Cusco, Perú<br>
          Teléfono / WhatsApp 24/7: +(51) 958 195 840 &bull; Email: info@lmptravel.com
        </p>
        <p style=""margin: 0; font-size: 10px; color: #525660;"">
          Este correo electrónico constituye un voucher oficial y comprobante formal de confirmación de pago digital. 
          Conserve este documento para el registro en el check-in de su expedición.
        </p>
      </div>
    </div>
  </div>
</body>
</html>";

        return await SendEmailAsync(recipientEmail, subject, html, customerName);
    }

    public async Task<bool> SendConciergePaymentNotificationAsync(BookingInquiry? booking, PaymentTransaction transaction)
    {
        var conciergeEmail = _configuration["CONCIERGE_EMAIL"]
            ?? _configuration["AgencySettings:Email"]
            ?? _configuration["SmtpSettings:ConciergeEmail"]
            ?? "concierge@luxurymachupicchu.com";

        var customerName = !string.IsNullOrWhiteSpace(transaction.CustomerName)
            ? transaction.CustomerName
            : (booking?.FullName ?? "Huésped");

        var tourTitle = booking?.Tour?.TitleEs 
            ?? booking?.Tour?.TitleEn 
            ?? "Expedición Privada de Lujo";

        var travelDate = booking?.TravelDate.HasValue == true
            ? booking.TravelDate.Value.ToString("yyyy-MM-dd")
            : "Por coordinar";

        var subject = $"[PAGO RECIBIDO] {transaction.ReferenceCode} - {customerName} - {transaction.Currency} {transaction.Amount:N2}";

        var cleanPhone = (transaction.CustomerPhone ?? booking?.Phone ?? "").Replace("+", "").Replace(" ", "").Replace("-", "");

        var html = $@"<!DOCTYPE html>
<html>
<head>
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f4f6f8; color: #333; margin: 0; padding: 20px; }}
    .card {{ max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e1e4e8; overflow: hidden; }}
    .head {{ background: #0e1118; color: #d4af37; padding: 20px 25px; border-bottom: 2px solid #d4af37; }}
    .head h2 {{ margin: 0; font-size: 18px; letter-spacing: 1px; }}
    .body {{ padding: 25px; }}
    .badge {{ background: #22c55e; color: #fff; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; text-transform: uppercase; }}
    table {{ width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px; }}
    td {{ padding: 8px 0; border-bottom: 1px solid #f0f0f0; }}
    .label {{ color: #6b7280; width: 40%; font-weight: 500; }}
    .val {{ color: #111827; font-weight: 600; text-align: right; }}
    .amount {{ font-size: 18px; color: #047857; }}
    .btn {{ display: inline-block; background: #0e1118; color: #d4af37; text-decoration: none; padding: 10px 18px; border-radius: 4px; font-size: 13px; font-weight: 600; margin-top: 20px; }}
  </style>
</head>
<body>
  <div class=""card"">
    <div class=""head"">
      <h2>✦ NUEVA TRANSACCIÓN CONFIRMADA - CULQI</h2>
      <div style=""font-size: 12px; color: #9ca3af; margin-top: 4px;"">Luxury Machupicchu Peru - Concierge Desk Notification</div>
    </div>
    <div class=""body"">
      <div style=""display: flex; justify-content: space-between; align-items: center;"">
        <span style=""font-size: 16px; font-weight: bold;"">Referencia: {transaction.ReferenceCode}</span>
        <span class=""badge"">PAGADO</span>
      </div>

      <table>
        <tr><td class=""label"">Huésped Titular:</td><td class=""val"">{customerName}</td></tr>
        <tr><td class=""label"">Email del Huésped:</td><td class=""val""><a href=""mailto:{transaction.CustomerEmail}"">{transaction.CustomerEmail}</a></td></tr>
        <tr><td class=""label"">Teléfono / WhatsApp:</td><td class=""val"">{transaction.CustomerPhone}</td></tr>
        <tr><td class=""label"">Tour / Experiencia:</td><td class=""val"">{tourTitle}</td></tr>
        <tr><td class=""label"">Fecha de Viaje:</td><td class=""val"">{travelDate}</td></tr>
        <tr><td class=""label"">Huéspedes:</td><td class=""val"">{booking?.NumberOfGuests ?? 2}</td></tr>
        <tr><td class=""label"">Tren:</td><td class=""val"">{booking?.TrainPreference ?? "Belmond Hiram Bingham"}</td></tr>
        <tr><td class=""label"">Monto Abonado:</td><td class=""val amount"">{transaction.Currency} {transaction.Amount:N2}</td></tr>
        <tr><td class=""label"">Tarjeta:</td><td class=""val"">{transaction.CardBrand} **** {transaction.CardLastFour}</td></tr>
        <tr><td class=""label"">Culqi Charge ID:</td><td class=""val""><code>{transaction.CulqiChargeId}</code></td></tr>
        <tr><td class=""label"">Código Autorización:</td><td class=""val""><code>{transaction.CulqiAuthorizationCode}</code></td></tr>
        <tr><td class=""label"">Fecha y Hora UTC:</td><td class=""val"">{transaction.CreatedAt:yyyy-MM-dd HH:mm:ss} UTC</td></tr>
      </table>

      {(string.IsNullOrWhiteSpace(cleanPhone) ? "" : $@"
      <a href=""https://wa.me/{cleanPhone}?text=Estimado/a%20{Uri.EscapeDataString(customerName)},%20le%20saluda%20el%20equipo%20de%20Concierge%20de%20Luxury%20Machupicchu%20Peru.%20Hemos%20recibido%20su%20pago%20{transaction.ReferenceCode}."" class=""btn"">
        Abrir Chat de WhatsApp con el Huésped &rarr;
      </a>
      ")}
    </div>
  </div>
</body>
</html>";

        return await SendEmailAsync(conciergeEmail, subject, html, "Concierge Desk");
    }
}
