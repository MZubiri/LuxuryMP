using System.ComponentModel.DataAnnotations;

namespace LuxuryMachupicchu.API.DTOs;

public class CategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string NameEn { get; set; } = string.Empty;
    public string NameEs { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public string DescriptionEs { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
    public int ToursCount { get; set; }
    public bool IsActive { get; set; } = true;
}

public class CreateCategoryDto
{
    [Required, StringLength(150)]
    public string NameEn { get; set; } = string.Empty;

    [Required, StringLength(150)]
    public string NameEs { get; set; } = string.Empty;

    [Required, StringLength(150)]
    public string Slug { get; set; } = string.Empty;

    public string DescriptionEn { get; set; } = string.Empty;
    public string DescriptionEs { get; set; } = string.Empty;
    public string Icon { get; set; } = "compass";
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}

public class UpdateCategoryDto
{
    [StringLength(150)]
    public string? NameEn { get; set; }

    [StringLength(150)]
    public string? NameEs { get; set; }

    [StringLength(150)]
    public string? Slug { get; set; }

    public string? DescriptionEn { get; set; }
    public string? DescriptionEs { get; set; }
    public string? Icon { get; set; }
    public int? DisplayOrder { get; set; }
    public bool? IsActive { get; set; }
}

public class TourSummaryDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string TitleEs { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Subtitle { get; set; } = string.Empty;
    public string SubtitleEn { get; set; } = string.Empty;
    public string SubtitleEs { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public string DescriptionEs { get; set; } = string.Empty;
    
    public int CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public string CategoryNameEn { get; set; } = string.Empty;
    public string CategoryNameEs { get; set; } = string.Empty;
    public string CategorySlug { get; set; } = string.Empty;
    
    public string Duration { get; set; } = string.Empty;
    public string DurationEn { get; set; } = string.Empty;
    public string DurationEs { get; set; } = string.Empty;
    public int DurationDays { get; set; }
    
    public decimal PriceUsd { get; set; }
    public decimal PricePen { get; set; }
    
    public string Difficulty { get; set; } = string.Empty;
    public string DifficultyEn { get; set; } = string.Empty;
    public string DifficultyEs { get; set; } = string.Empty;
    public string AltitudeMax { get; set; } = string.Empty;
    public string StartingPoint { get; set; } = string.Empty;
    public string StyleTag { get; set; } = string.Empty;
    
    public bool Featured { get; set; }
    public bool IsActive { get; set; } = true;
    public int DisplayOrder { get; set; }
    public int InquiriesCount { get; set; }
    public string MainImageUrl { get; set; } = string.Empty;
    public List<string> Highlights { get; set; } = new();
    public List<string> HighlightsEn { get; set; } = new();
    public List<string> HighlightsEs { get; set; } = new();
}

public class AdminTourDetailDto
{
    public int Id { get; set; }
    public string TitleEn { get; set; } = string.Empty;
    public string TitleEs { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string SubtitleEn { get; set; } = string.Empty;
    public string SubtitleEs { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public string DescriptionEs { get; set; } = string.Empty;
    
    public int CategoryId { get; set; }
    public string CategoryNameEn { get; set; } = string.Empty;
    public string CategoryNameEs { get; set; } = string.Empty;
    public string CategorySlug { get; set; } = string.Empty;
    
    public string DurationEn { get; set; } = string.Empty;
    public string DurationEs { get; set; } = string.Empty;
    public int DurationDays { get; set; }
    
    public decimal PriceUsd { get; set; }
    public decimal PricePen { get; set; }
    
    public string DifficultyEn { get; set; } = string.Empty;
    public string DifficultyEs { get; set; } = string.Empty;
    public string AltitudeMax { get; set; } = string.Empty;
    public string StartingPoint { get; set; } = string.Empty;
    public string StyleTag { get; set; } = string.Empty;
    
    public bool Featured { get; set; }
    public bool IsActive { get; set; }
    public int DisplayOrder { get; set; }
    
    public string MainImageUrl { get; set; } = string.Empty;
    public List<string> GalleryImages { get; set; } = new();
    public List<string> IncludedEn { get; set; } = new();
    public List<string> IncludedEs { get; set; } = new();
    public List<string> NotIncludedEn { get; set; } = new();
    public List<string> NotIncludedEs { get; set; } = new();
    public List<string> HighlightsEn { get; set; } = new();
    public List<string> HighlightsEs { get; set; } = new();
    public List<string> Locations { get; set; } = new();
    public AltitudeProfileDto? AltitudeProfile { get; set; }
    public string AltitudeProfileJson { get; set; } = "{}";
    
    public List<ItineraryDayDto> Itineraries { get; set; } = new();
    public int InquiriesCount { get; set; }
}

public class TourDetailDto : TourSummaryDto
{
    public List<string> GalleryImages { get; set; } = new();
    public List<string> Included { get; set; } = new();
    public List<string> IncludedEn { get; set; } = new();
    public List<string> IncludedEs { get; set; } = new();
    public List<string> NotIncluded { get; set; } = new();
    public List<string> NotIncludedEn { get; set; } = new();
    public List<string> NotIncludedEs { get; set; } = new();
    public List<string> Locations { get; set; } = new();
    public AltitudeProfileDto? AltitudeProfile { get; set; }
    public List<ItineraryDayDto> Itineraries { get; set; } = new();
}

public class AltitudeProfileDto
{
    public string StartingAltitude { get; set; } = string.Empty;
    public string MaxAltitude { get; set; } = string.Empty;
    public string SleepingAltitude { get; set; } = string.Empty;
    public int OxygenPercentage { get; set; } = 85;
    public string AcclimatizationTip { get; set; } = string.Empty;
}

public class ItineraryDayDto
{
    public int Id { get; set; }
    public int DayNumber { get; set; }
    public string Title { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string TitleEs { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public string DescriptionEs { get; set; } = string.Empty;
    public string GourmetDining { get; set; } = string.Empty;
    public string GourmetDiningEn { get; set; } = string.Empty;
    public string GourmetDiningEs { get; set; } = string.Empty;
    public string PrivateTransfer { get; set; } = string.Empty;
    public string PrivateTransferEn { get; set; } = string.Empty;
    public string PrivateTransferEs { get; set; } = string.Empty;
}

public class CreateTourDto
{
    [Required, StringLength(250)]
    public string TitleEn { get; set; } = string.Empty;

    [Required, StringLength(250)]
    public string TitleEs { get; set; } = string.Empty;

    [StringLength(250)]
    public string? Slug { get; set; }

    public string SubtitleEn { get; set; } = string.Empty;
    public string SubtitleEs { get; set; } = string.Empty;

    public string DescriptionEn { get; set; } = string.Empty;
    public string DescriptionEs { get; set; } = string.Empty;

    [Required]
    public int CategoryId { get; set; }

    public string DurationEn { get; set; } = "Full Day";
    public string DurationEs { get; set; } = "Día Completo";
    public int DurationDays { get; set; } = 1;

    [Range(0, 1000000)]
    public decimal PriceUsd { get; set; }

    [Range(0, 4000000)]
    public decimal PricePen { get; set; }

    public string DifficultyEn { get; set; } = "Leisure";
    public string DifficultyEs { get; set; } = "Exclusivo / Suave";

    public string AltitudeMax { get; set; } = "2,430 m / 7,972 ft";
    public string StartingPoint { get; set; } = "Cusco / Sacred Valley";
    public string StyleTag { get; set; } = "Ultra-Luxury";

    public bool Featured { get; set; }
    public bool IsActive { get; set; } = true;
    public int DisplayOrder { get; set; }

    public string MainImageUrl { get; set; } = string.Empty;
    public List<string>? GalleryImages { get; set; }
    public List<string>? IncludedEn { get; set; }
    public List<string>? IncludedEs { get; set; }
    public List<string>? NotIncludedEn { get; set; }
    public List<string>? NotIncludedEs { get; set; }
    public List<string>? HighlightsEn { get; set; }
    public List<string>? HighlightsEs { get; set; }
    public List<string>? Locations { get; set; }
    public string? AltitudeProfileJson { get; set; }

    public List<CreateItineraryDayDto>? Itineraries { get; set; }
}

public class UpdateTourDto : CreateTourDto
{
}

public class CreateItineraryDayDto
{
    public int DayNumber { get; set; }
    public string TitleEn { get; set; } = string.Empty;
    public string TitleEs { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public string DescriptionEs { get; set; } = string.Empty;
    public string? GourmetDiningEn { get; set; }
    public string? GourmetDiningEs { get; set; }
    public string? PrivateTransferEn { get; set; }
    public string? PrivateTransferEs { get; set; }
}

public class TestimonialDto
{
    public int Id { get; set; }
    public string GuestName { get; set; } = string.Empty;
    public string OriginCountry { get; set; } = string.Empty;
    public int Rating { get; set; } = 5;
    public string CommentEn { get; set; } = string.Empty;
    public string CommentEs { get; set; } = string.Empty;
    public string JourneyName { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public bool IsVerified { get; set; } = true;
}

public class CreateTestimonialDto
{
    [Required, StringLength(120)]
    public string GuestName { get; set; } = string.Empty;

    public string OriginCountry { get; set; } = string.Empty;

    [Range(1, 5)]
    public int Rating { get; set; } = 5;

    [Required]
    public string CommentEn { get; set; } = string.Empty;

    [Required]
    public string CommentEs { get; set; } = string.Empty;

    public string JourneyName { get; set; } = string.Empty;
    public bool IsVerified { get; set; } = true;
}
