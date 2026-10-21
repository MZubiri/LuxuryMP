using System.Text.Json;
using LuxuryMachupicchu.API.DTOs;
using LuxuryMachupicchu.Domain.Entities;
using Xunit;

namespace LuxuryMachupicchu.Tests;

public class CulqiWebhookTests
{
    [Fact]
    public void CulqiWebhook_SucceededPayload_ParsesCorrectly()
    {
        var rawJson = @"{
            ""id"": ""evt_live_test123"",
            ""type"": ""charge.creation.succeeded"",
            ""data"": {
                ""id"": ""chr_live_abc789"",
                ""amount"": 430000,
                ""currency_code"": ""USD"",
                ""email"": ""lord.crawley@downton.co.uk"",
                ""source"": {
                    ""card_number"": ""411111******1111"",
                    ""iin"": { ""card_brand"": ""Visa"" }
                },
                ""outcome"": {
                    ""code"": ""AUTH_998877"",
                    ""user_message"": ""Cargo procesado exitosamente.""
                },
                ""metadata"": {
                    ""reference_code"": ""RES-0042"",
                    ""booking_id"": ""42"",
                    ""customer_name"": ""Lord Robert Crawley"",
                    ""customer_phone"": ""+44 7700 900077""
                }
            }
        }";

        using var doc = JsonDocument.Parse(rawJson);
        var root = doc.RootElement;

        Assert.Equal("charge.creation.succeeded", root.GetProperty("type").GetString());
        
        var data = root.GetProperty("data");
        Assert.Equal("chr_live_abc789", data.GetProperty("id").GetString());
        Assert.Equal(430000, data.GetProperty("amount").GetInt64());
        Assert.Equal("USD", data.GetProperty("currency_code").GetString());
        Assert.Equal("Visa", data.GetProperty("source").GetProperty("iin").GetProperty("card_brand").GetString());
        Assert.Equal("AUTH_998877", data.GetProperty("outcome").GetProperty("code").GetString());

        var metadata = data.GetProperty("metadata");
        Assert.Equal("RES-0042", metadata.GetProperty("reference_code").GetString());
        Assert.Equal("42", metadata.GetProperty("booking_id").GetString());
    }

    [Fact]
    public void CulqiWebhook_FailedPayload_ParsesCorrectly()
    {
        var rawJson = @"{
            ""id"": ""evt_live_fail456"",
            ""type"": ""charge.creation.failed"",
            ""data"": {
                ""id"": ""chr_live_fail999"",
                ""outcome"": {
                    ""code"": ""INSUFFICIENT_FUNDS"",
                    ""user_message"": ""Fondos insuficientes en la tarjeta.""
                },
                ""metadata"": {
                    ""reference_code"": ""RES-0042"",
                    ""booking_id"": ""42""
                }
            }
        }";

        using var doc = JsonDocument.Parse(rawJson);
        var root = doc.RootElement;

        Assert.Equal("charge.creation.failed", root.GetProperty("type").GetString());
        var data = root.GetProperty("data");
        Assert.Equal("chr_live_fail999", data.GetProperty("id").GetString());
        Assert.Equal("INSUFFICIENT_FUNDS", data.GetProperty("outcome").GetProperty("code").GetString());
    }

    [Fact]
    public void PaymentTransaction_CanLinkToBooking()
    {
        var booking = new BookingInquiry
        {
            Id = 15,
            FullName = "Lady Mary Crawley",
            Email = "mary@downton.co.uk",
            Status = "Pending"
        };

        var tx = new PaymentTransaction
        {
            Id = 1,
            CulqiChargeId = "chr_live_test123",
            CulqiAuthorizationCode = "AUTH_123456",
            ReferenceType = "Booking",
            ReferenceCode = $"RES-{booking.Id:D4}",
            BookingId = booking.Id,
            CustomerName = booking.FullName,
            CustomerEmail = booking.Email,
            Amount = 2150.00m,
            Currency = "USD",
            Status = "Paid"
        };

        Assert.Equal("RES-0015", tx.ReferenceCode);
        Assert.Equal(15, tx.BookingId);
        Assert.Equal("Paid", tx.Status);
    }
}
