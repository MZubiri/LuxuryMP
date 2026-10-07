using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LuxuryMachupicchu.API.DTOs;
using LuxuryMachupicchu.Infrastructure.Data;

namespace LuxuryMachupicchu.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Administrator")]
public class DashboardController : ControllerBase
{
    private readonly LuxuryMachupicchuDbContext _context;

    public DashboardController(LuxuryMachupicchuDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Admin endpoint: returns real-time KPI metrics, revenue summaries, and recent activity.
    /// Completely dynamic and backed by database queries.
    /// </summary>
    [HttpGet("stats")]
    public async Task<ActionResult<DashboardStatsDto>> GetStats()
    {
        var totalBookings = await _context.BookingInquiries.CountAsync();
        var pendingBookings = await _context.BookingInquiries.CountAsync(b => b.Status == "Pending");
        var contactedBookings = await _context.BookingInquiries.CountAsync(b => b.Status == "Contacted");
        var confirmedBookings = await _context.BookingInquiries.CountAsync(b => b.Status == "Confirmed");
        var paidBookings = await _context.BookingInquiries.CountAsync(b => b.Status == "Paid");
        var cancelledBookings = await _context.BookingInquiries.CountAsync(b => b.Status == "Cancelled");

        var confirmedRevenueUsd = await _context.BookingInquiries
            .Where(b => b.Status == "Paid" || b.Status == "Confirmed")
            .SumAsync(b => (decimal?)b.EstimatedTotalUsd) ?? 0m;

        var confirmedRevenuePen = await _context.BookingInquiries
            .Where(b => b.Status == "Paid" || b.Status == "Confirmed")
            .SumAsync(b => (decimal?)b.EstimatedTotalPen) ?? 0m;

        var pipelineRevenueUsd = await _context.BookingInquiries
            .Where(b => b.Status != "Cancelled")
            .SumAsync(b => (decimal?)b.EstimatedTotalUsd) ?? 0m;

        var pipelineRevenuePen = await _context.BookingInquiries
            .Where(b => b.Status != "Cancelled")
            .SumAsync(b => (decimal?)b.EstimatedTotalPen) ?? 0m;

        var totalConcierge = await _context.ConciergeRequests.CountAsync();
        var pendingConcierge = await _context.ConciergeRequests.CountAsync(r => !r.IsAddressed);
        var addressedConcierge = await _context.ConciergeRequests.CountAsync(r => r.IsAddressed);

        var totalContact = await _context.ContactMessages.CountAsync();
        var unreadContact = await _context.ContactMessages.CountAsync(m => !m.IsRead);

        var totalActiveTours = await _context.Tours.CountAsync(t => t.IsActive);
        var totalCatalogTours = await _context.Tours.CountAsync();

        var recentBookings = await _context.BookingInquiries
            .Include(b => b.Tour)
            .AsNoTracking()
            .OrderByDescending(b => b.CreatedAt)
            .Take(8)
            .Select(b => new AdminBookingDetailDto
            {
                Id = b.Id,
                TourId = b.TourId,
                TourTitle = b.Tour != null ? b.Tour.TitleEn : "Bespoke Journey",
                TourSlug = b.Tour != null ? b.Tour.Slug : string.Empty,
                TourMainImageUrl = b.Tour != null ? b.Tour.MainImageUrl : string.Empty,
                FullName = b.FullName,
                Email = b.Email,
                Phone = b.Phone,
                Country = b.Country,
                NumberOfGuests = b.NumberOfGuests,
                TravelDate = b.TravelDate,
                TrainPreference = b.TrainPreference,
                SpecialRequests = b.SpecialRequests,
                PreferredLanguage = b.PreferredLanguage,
                EstimatedTotalUsd = b.EstimatedTotalUsd,
                EstimatedTotalPen = b.EstimatedTotalPen,
                Status = b.Status,
                CreatedAt = b.CreatedAt,
                WhatsAppUrl = BuildGuestWhatsAppUrl(b.Phone, b.FullName, b.Tour != null ? b.Tour.TitleEn : "Bespoke Journey")
            })
            .ToListAsync();

        var recentConcierge = await _context.ConciergeRequests
            .AsNoTracking()
            .OrderByDescending(r => r.CreatedAt)
            .Take(6)
            .Select(r => new ConciergeRequestDto
            {
                Id = r.Id,
                GuestName = r.GuestName,
                Email = r.Email,
                WhatsApp = r.WhatsApp,
                DestinationFocus = r.DestinationFocus,
                JourneyDuration = r.JourneyDuration,
                TravelersCount = r.TravelersCount,
                BudgetTier = r.BudgetTier,
                BespokeNotes = r.BespokeNotes,
                CreatedAt = r.CreatedAt,
                IsAddressed = r.IsAddressed,
                WhatsAppUrl = BuildConciergeWhatsAppReply(r.WhatsApp, r.GuestName)
            })
            .ToListAsync();

        // Top requested tours
        var topTours = await _context.BookingInquiries
            .Where(b => b.TourId != null)
            .GroupBy(b => new { b.TourId, b.Tour!.TitleEn, b.Tour!.Slug })
            .Select(g => new TopTourStatDto
            {
                TourId = g.Key.TourId!.Value,
                Title = g.Key.TitleEn,
                Slug = g.Key.Slug,
                InquiryCount = g.Count(),
                TotalEstimatedUsd = g.Sum(x => x.EstimatedTotalUsd)
            })
            .OrderByDescending(x => x.InquiryCount)
            .Take(5)
            .ToListAsync();

        var stats = new DashboardStatsDto
        {
            TotalBookings = totalBookings,
            PendingBookings = pendingBookings,
            ContactedBookings = contactedBookings,
            ConfirmedBookings = confirmedBookings,
            PaidBookings = paidBookings,
            CancelledBookings = cancelledBookings,
            ConfirmedRevenueUsd = confirmedRevenueUsd,
            ConfirmedRevenuePen = confirmedRevenuePen,
            PipelineRevenueUsd = pipelineRevenueUsd,
            PipelineRevenuePen = pipelineRevenuePen,
            TotalConciergeRequests = totalConcierge,
            PendingConciergeRequests = pendingConcierge,
            AddressedConciergeRequests = addressedConcierge,
            TotalContactMessages = totalContact,
            UnreadContactMessages = unreadContact,
            TotalActiveTours = totalActiveTours,
            TotalCatalogTours = totalCatalogTours,
            RecentBookings = recentBookings,
            RecentConciergeRequests = recentConcierge,
            TopRequestedTours = topTours
        };

        return Ok(stats);
    }

    private static string BuildGuestWhatsAppUrl(string phone, string guestName, string tourTitle)
    {
        var cleanPhone = new string(phone.Where(char.IsDigit).ToArray());
        if (string.IsNullOrWhiteSpace(cleanPhone)) return string.Empty;

        var message = $"Dear {guestName}, greeting from Luxury Machupicchu Peru Concierge regarding your inquiry for {tourTitle}.";
        return $"https://wa.me/{cleanPhone}?text={WebUtility.UrlEncode(message)}";
    }

    private static string BuildConciergeWhatsAppReply(string phone, string guestName)
    {
        var digits = new string(phone.Where(char.IsDigit).ToArray());
        if (string.IsNullOrWhiteSpace(digits)) return string.Empty;

        var message = $"Dear {guestName}, this is the Director of Concierge at Luxury Machupicchu Peru regarding your bespoke travel inquiry.";
        return $"https://wa.me/{digits}?text={WebUtility.UrlEncode(message)}";
    }
}
