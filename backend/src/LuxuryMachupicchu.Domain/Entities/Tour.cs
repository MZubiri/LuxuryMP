namespace LuxuryMachupicchu.Domain.Entities;

public class Tour
{
    public int Id { get; set; }
    
    // Bilingual Content
    public string TitleEn { get; set; } = string.Empty;
    public string TitleEs { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    
    public string SubtitleEn { get; set; } = string.Empty;
    public string SubtitleEs { get; set; } = string.Empty;
    
    public string DescriptionEn { get; set; } = string.Empty;
    public string DescriptionEs { get; set; } = string.Empty;
    
    public int CategoryId { get; set; }
    public Category? Category { get; set; }
    
    // Luxury Specs
    public string DurationEn { get; set; } = "Full Day";
    public string DurationEs { get; set; } = "Día Completo";
    public int DurationDays { get; set; } = 1;
    
    public decimal PriceUsd { get; set; }
    public decimal PricePen { get; set; }
    
    public string DifficultyEn { get; set; } = "Leisure"; // Leisure, Moderate, Bespoke Trek
    public string DifficultyEs { get; set; } = "Exclusivo / Suave";
    
    public string AltitudeMax { get; set; } = "2,430 m / 7,972 ft";
    public string StartingPoint { get; set; } = "Cusco / Sacred Valley";
    public string StyleTag { get; set; } = "Ultra-Luxury"; // Hiram Bingham, Private Charter, Sanctuary Privé
    
    public bool Featured { get; set; }
    public bool IsActive { get; set; } = true;
    public int DisplayOrder { get; set; }
    
    // Imagery & Media
    public string MainImageUrl { get; set; } = string.Empty;
    public string GalleryImagesJson { get; set; } = "[]";
    
    // JSON Collections (Bilingual or structured)
    public string IncludedJsonEn { get; set; } = "[]";
    public string IncludedJsonEs { get; set; } = "[]";
    public string NotIncludedJsonEn { get; set; } = "[]";
    public string NotIncludedJsonEs { get; set; } = "[]";
    public string HighlightsJsonEn { get; set; } = "[]";
    public string HighlightsJsonEs { get; set; } = "[]";
    public string LocationsJson { get; set; } = "[]";
    public string AltitudeProfileJson { get; set; } = "{}";
    
    // Navigation collections
    public ICollection<ItineraryDay> Itineraries { get; set; } = new List<ItineraryDay>();
    public ICollection<BookingInquiry> BookingInquiries { get; set; } = new List<BookingInquiry>();
}
