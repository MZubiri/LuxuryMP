using System.ComponentModel.DataAnnotations;

namespace LuxuryMachupicchu.API.DTOs;

public class CreateBookingInquiryDto
{
    [Required]
    public int TourId { get; set; }

    [Required, StringLength(120)]
    public string FullName { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required, StringLength(40)]
    public string Phone { get; set; } = string.Empty;

    public string? Country { get; set; }

    [Range(1, 20)]
    public int NumberOfGuests { get; set; } = 2;

    public DateTime? TravelDate { get; set; }

    public string? TrainPreference { get; set; } = "Belmond Hiram Bingham";

    public string? SpecialRequests { get; set; }

    public string PreferredLanguage { get; set; } = "en"; // en, es
}

public class BookingInquiryResponseDto
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string TourTitle { get; set; } = string.Empty;
    public decimal EstimatedTotalUsd { get; set; }
    public decimal EstimatedTotalPen { get; set; }
    public string Status { get; set; } = "Pending";
    public DateTime CreatedAt { get; set; }
    public string WhatsAppDirectUrl { get; set; } = string.Empty;
}

public class CreateConciergeRequestDto
{
    [Required, StringLength(120)]
    public string GuestName { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string WhatsApp { get; set; } = string.Empty;

    public string DestinationFocus { get; set; } = "Machu Picchu & Sacred Valley";

    public string JourneyDuration { get; set; } = "3-5 Days";

    [Range(1, 20)]
    public int TravelersCount { get; set; } = 2;

    public string BudgetTier { get; set; } = "Ultra-Luxury Bespoke";

    public string? BespokeNotes { get; set; }

    public string PreferredLanguage { get; set; } = "en";
}
