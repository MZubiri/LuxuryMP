using LuxuryMachupicchu.Domain.Entities;

namespace LuxuryMachupicchu.Domain.Interfaces;

public interface IEmailService
{
    /// <summary>
    /// Sends a general transactional HTML email.
    /// </summary>
    Task<bool> SendEmailAsync(string toEmail, string subject, string htmlBody, string? toName = null);

    /// <summary>
    /// Sends the formal payment confirmation and bespoke journey voucher to the guest.
    /// </summary>
    Task<bool> SendPaymentConfirmationAsync(BookingInquiry? booking, PaymentTransaction transaction);

    /// <summary>
    /// Sends immediate alert to the Private Concierge desk upon confirmed transaction.
    /// </summary>
    Task<bool> SendConciergePaymentNotificationAsync(BookingInquiry? booking, PaymentTransaction transaction);
}
