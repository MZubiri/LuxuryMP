using LuxuryMachupicchu.Domain.Entities;
using LuxuryMachupicchu.Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Abstractions;
using Xunit;

namespace LuxuryMachupicchu.Tests;

public class EmailServiceTests
{
    [Fact]
    public async Task SmtpEmailService_HandlesSimulatedModeGracefully()
    {
        var config = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["SMTP_HOST"] = "",
                ["SMTP_PORT"] = "587",
                ["SMTP_FROM_EMAIL"] = "info@lmptravel.com"
            })
            .Build();

        var service = new SmtpEmailService(config, NullLogger<SmtpEmailService>.Instance);

        var booking = new BookingInquiry
        {
            Id = 7,
            FullName = "Alexander von Humboldt",
            Email = "humboldt@expeditions.org",
            NumberOfGuests = 2,
            TrainPreference = "Belmond Hiram Bingham",
            TravelDate = new DateTime(2026, 12, 15)
        };

        var tx = new PaymentTransaction
        {
            ReferenceCode = "RES-0007",
            CustomerName = booking.FullName,
            CustomerEmail = booking.Email,
            CustomerPhone = "+51 999 888 777",
            Amount = 4300.00m,
            Currency = "USD",
            CardBrand = "Mastercard",
            CardLastFour = "9876",
            CulqiAuthorizationCode = "AUTH_554433",
            CulqiChargeId = "chr_live_mock123",
            Status = "Paid"
        };

        // In simulation mode (no host), it should log and return true
        var resultGuest = await service.SendPaymentConfirmationAsync(booking, tx);
        var resultConcierge = await service.SendConciergePaymentNotificationAsync(booking, tx);

        Assert.True(resultGuest);
        Assert.True(resultConcierge);
    }
}
