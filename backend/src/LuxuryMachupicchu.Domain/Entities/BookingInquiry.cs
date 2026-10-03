namespace LuxuryMachupicchu.Domain.Entities;

public class BookingInquiry
{
    public int Id { get; set; }
    public int? TourId { get; set; }
    public Tour? Tour { get; set; }
    
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    
    public int NumberOfGuests { get; set; } = 2;
    public DateTime? TravelDate { get; set; }
    public string TrainPreference { get; set; } = "Belmond Hiram Bingham"; // Hiram Bingham, 360 Inca Rail, Vistadome Observatory
    public string SpecialRequests { get; set; } = string.Empty;
    public string PreferredLanguage { get; set; } = "en"; // en, es
    
    public decimal EstimatedTotalUsd { get; set; }
    public decimal EstimatedTotalPen { get; set; }
    
    public string Status { get; set; } = "Pending"; // Pending, Contacted, Confirmed, Paid, Cancelled
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class PrivateConciergeRequest
{
    public int Id { get; set; }
    public string GuestName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string WhatsApp { get; set; } = string.Empty;
    public string DestinationFocus { get; set; } = "Machu Picchu & Sacred Valley";
    public string JourneyDuration { get; set; } = "3-5 Days";
    public int TravelersCount { get; set; } = 2;
    public string BudgetTier { get; set; } = "Ultra-Luxury Bespoke";
    public string BespokeNotes { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsAddressed { get; set; } = false;
}

public class ContactMessage
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsRead { get; set; } = false;
}

public class Testimonial
{
    public int Id { get; set; }
    public string GuestName { get; set; } = string.Empty;
    public string OriginCountry { get; set; } = string.Empty; // e.g., "London, UK", "New York, USA"
    public int Rating { get; set; } = 5;
    public string CommentEn { get; set; } = string.Empty;
    public string CommentEs { get; set; } = string.Empty;
    public string JourneyName { get; set; } = string.Empty;
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public bool IsVerified { get; set; } = true;
}
