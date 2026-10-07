namespace LuxuryMachupicchu.API.DTOs;

public class DashboardStatsDto
{
    public int TotalBookings { get; set; }
    public int PendingBookings { get; set; }
    public int ContactedBookings { get; set; }
    public int ConfirmedBookings { get; set; }
    public int PaidBookings { get; set; }
    public int CancelledBookings { get; set; }
    
    public decimal ConfirmedRevenueUsd { get; set; }
    public decimal ConfirmedRevenuePen { get; set; }
    public decimal PipelineRevenueUsd { get; set; }
    public decimal PipelineRevenuePen { get; set; }
    
    public int TotalConciergeRequests { get; set; }
    public int PendingConciergeRequests { get; set; }
    public int AddressedConciergeRequests { get; set; }
    
    public int TotalContactMessages { get; set; }
    public int UnreadContactMessages { get; set; }
    
    public int TotalActiveTours { get; set; }
    public int TotalCatalogTours { get; set; }
    
    public List<AdminBookingDetailDto> RecentBookings { get; set; } = new();
    public List<ConciergeRequestDto> RecentConciergeRequests { get; set; } = new();
    public List<TopTourStatDto> TopRequestedTours { get; set; } = new();
}

public class TopTourStatDto
{
    public int TourId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public int InquiryCount { get; set; }
    public decimal TotalEstimatedUsd { get; set; }
}
