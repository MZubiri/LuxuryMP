namespace LuxuryMachupicchu.Domain.Entities;

public class ItineraryDay
{
    public int Id { get; set; }
    public int TourId { get; set; }
    public Tour? Tour { get; set; }
    
    public int DayNumber { get; set; }
    
    public string TitleEn { get; set; } = string.Empty;
    public string TitleEs { get; set; } = string.Empty;
    
    public string DescriptionEn { get; set; } = string.Empty;
    public string DescriptionEs { get; set; } = string.Empty;
    
    public string GourmetDiningEn { get; set; } = string.Empty;
    public string GourmetDiningEs { get; set; } = string.Empty;
    
    public string PrivateTransferEn { get; set; } = string.Empty;
    public string PrivateTransferEs { get; set; } = string.Empty;
}
