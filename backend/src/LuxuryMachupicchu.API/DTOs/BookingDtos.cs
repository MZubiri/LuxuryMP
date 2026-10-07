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

public class AdminBookingDetailDto
{
    public int Id { get; set; }
    public int? TourId { get; set; }
    public string TourTitle { get; set; } = string.Empty;
    public string TourSlug { get; set; } = string.Empty;
    public string TourMainImageUrl { get; set; } = string.Empty;
    
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    
    public int NumberOfGuests { get; set; }
    public DateTime? TravelDate { get; set; }
    public string TrainPreference { get; set; } = string.Empty;
    public string SpecialRequests { get; set; } = string.Empty;
    public string PreferredLanguage { get; set; } = "en";
    
    public decimal EstimatedTotalUsd { get; set; }
    public decimal EstimatedTotalPen { get; set; }
    public string Status { get; set; } = "Pending";
    public DateTime CreatedAt { get; set; }
    public string WhatsAppUrl { get; set; } = string.Empty;
}

public class UpdateBookingStatusDto
{
    [Required]
    public string Status { get; set; } = string.Empty; // Pending, Contacted, Confirmed, Paid, Cancelled
    public string? Notes { get; set; }
}

public class UpdateBookingDto
{
    public string? FullName { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Country { get; set; }
    public int? NumberOfGuests { get; set; }
    public DateTime? TravelDate { get; set; }
    public string? TrainPreference { get; set; }
    public string? SpecialRequests { get; set; }
    public string? Status { get; set; }
    public decimal? EstimatedTotalUsd { get; set; }
    public decimal? EstimatedTotalPen { get; set; }
}

public class BookingQueryParameters
{
    public string? Status { get; set; }
    public string? Search { get; set; }
    public DateTime? FromDate { get; set; }
    public DateTime? ToDate { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;
}

public class PaginatedResponse<T>
{
    public int TotalItems { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => PageSize > 0 ? (int)Math.Ceiling((double)TotalItems / PageSize) : 0;
    public bool HasNextPage => Page < TotalPages;
    public bool HasPreviousPage => Page > 1;
    public IEnumerable<T> Items { get; set; } = Enumerable.Empty<T>();
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

public class ConciergeRequestDto
{
    public int Id { get; set; }
    public string GuestName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string WhatsApp { get; set; } = string.Empty;
    public string DestinationFocus { get; set; } = string.Empty;
    public string JourneyDuration { get; set; } = string.Empty;
    public int TravelersCount { get; set; }
    public string BudgetTier { get; set; } = string.Empty;
    public string BespokeNotes { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public bool IsAddressed { get; set; }
    public string WhatsAppUrl { get; set; } = string.Empty;
}

public class UpdateConciergeStatusDto
{
    public bool IsAddressed { get; set; }
}
