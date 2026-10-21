namespace LuxuryMachupicchu.Domain.Entities;

public class PaymentTransaction
{
    public int Id { get; set; }
    public string CulqiChargeId { get; set; } = string.Empty;
    public string CulqiAuthorizationCode { get; set; } = string.Empty;
    public string ReferenceType { get; set; } = "Booking"; // "Booking", "ConciergeQuote", "Custom"
    public string ReferenceCode { get; set; } = string.Empty; // e.g. "RES-001" or "COT-2026-0001"
    public int? BookingId { get; set; }
    public BookingInquiry? Booking { get; set; }
    public int? ConciergeRequestId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerEmail { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Currency { get; set; } = "USD"; // USD, PEN
    public string PaymentMethod { get; set; } = "Culqi"; // Culqi_Card, Culqi_Yape
    public string CardBrand { get; set; } = string.Empty; // Visa, Mastercard, Amex, Diners
    public string CardLastFour { get; set; } = string.Empty;
    public string Status { get; set; } = "Paid"; // Paid, Pending, Failed, Refunded
    public string RawResponseJson { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
