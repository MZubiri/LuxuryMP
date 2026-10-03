using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LuxuryMachupicchu.API.DTOs;
using LuxuryMachupicchu.Domain.Entities;
using LuxuryMachupicchu.Infrastructure.Data;

namespace LuxuryMachupicchu.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ToursController : ControllerBase
{
    private readonly LuxuryMachupicchuDbContext _context;

    public ToursController(LuxuryMachupicchuDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TourSummaryDto>>> GetTours(
        [FromQuery] string? category,
        [FromQuery] bool? featured,
        [FromQuery] string? search,
        [FromQuery] string lang = "en")
    {
        var isEs = string.Equals(lang, "es", StringComparison.OrdinalIgnoreCase);

        var query = _context.Tours
            .Include(t => t.Category)
            .Where(t => t.IsActive)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(category))
        {
            query = query.Where(t => t.Category != null && t.Category.Slug.ToLower() == category.ToLower());
        }

        if (featured.HasValue && featured.Value)
        {
            query = query.Where(t => t.Featured);
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim().ToLower();
            query = query.Where(t => t.TitleEn.ToLower().Contains(s) || 
                                     t.TitleEs.ToLower().Contains(s) ||
                                     t.DescriptionEn.ToLower().Contains(s) || 
                                     t.DescriptionEs.ToLower().Contains(s));
        }

        var tours = await query
            .OrderBy(t => t.DisplayOrder)
            .ToListAsync();

        var result = tours.Select(t => new TourSummaryDto
        {
            Id = t.Id,
            Title = isEs ? t.TitleEs : t.TitleEn,
            Slug = t.Slug,
            Subtitle = isEs ? t.SubtitleEs : t.SubtitleEn,
            Description = isEs ? t.DescriptionEs : t.DescriptionEn,
            CategoryId = t.CategoryId,
            CategoryName = t.Category != null ? (isEs ? t.Category.NameEs : t.Category.NameEn) : string.Empty,
            CategorySlug = t.Category?.Slug ?? string.Empty,
            Duration = isEs ? t.DurationEs : t.DurationEn,
            DurationDays = t.DurationDays,
            PriceUsd = t.PriceUsd,
            PricePen = t.PricePen,
            Difficulty = isEs ? t.DifficultyEs : t.DifficultyEn,
            AltitudeMax = t.AltitudeMax,
            StartingPoint = t.StartingPoint,
            StyleTag = t.StyleTag,
            Featured = t.Featured,
            MainImageUrl = t.MainImageUrl,
            Highlights = DeserializeList(isEs ? t.HighlightsJsonEs : t.HighlightsJsonEn)
        }).ToList();

        return Ok(result);
    }

    [HttpGet("featured")]
    public async Task<ActionResult<IEnumerable<TourSummaryDto>>> GetFeatured([FromQuery] string lang = "en")
    {
        return await GetTours(null, true, null, lang);
    }

    [HttpGet("{slug}")]
    public async Task<ActionResult<TourDetailDto>> GetTourBySlug(string slug, [FromQuery] string lang = "en")
    {
        var isEs = string.Equals(lang, "es", StringComparison.OrdinalIgnoreCase);

        var tour = await _context.Tours
            .Include(t => t.Category)
            .Include(t => t.Itineraries.OrderBy(i => i.DayNumber))
            .FirstOrDefaultAsync(t => t.Slug == slug && t.IsActive);

        if (tour == null)
        {
            return NotFound(new { message = $"Expedition '{slug}' not found." });
        }

        var detail = new TourDetailDto
        {
            Id = tour.Id,
            Title = isEs ? tour.TitleEs : tour.TitleEn,
            Slug = tour.Slug,
            Subtitle = isEs ? tour.SubtitleEs : tour.SubtitleEn,
            Description = isEs ? tour.DescriptionEs : tour.DescriptionEn,
            CategoryId = tour.CategoryId,
            CategoryName = tour.Category != null ? (isEs ? tour.Category.NameEs : tour.Category.NameEn) : string.Empty,
            CategorySlug = tour.Category?.Slug ?? string.Empty,
            Duration = isEs ? tour.DurationEs : tour.DurationEn,
            DurationDays = tour.DurationDays,
            PriceUsd = tour.PriceUsd,
            PricePen = tour.PricePen,
            Difficulty = isEs ? tour.DifficultyEs : tour.DifficultyEn,
            AltitudeMax = tour.AltitudeMax,
            StartingPoint = tour.StartingPoint,
            StyleTag = tour.StyleTag,
            Featured = tour.Featured,
            MainImageUrl = tour.MainImageUrl,
            GalleryImages = DeserializeList(tour.GalleryImagesJson),
            Highlights = DeserializeList(isEs ? tour.HighlightsJsonEs : tour.HighlightsJsonEn),
            Included = DeserializeList(isEs ? tour.IncludedJsonEs : tour.IncludedJsonEn),
            NotIncluded = DeserializeList(isEs ? tour.NotIncludedJsonEs : tour.NotIncludedJsonEn),
            Locations = DeserializeList(tour.LocationsJson),
            AltitudeProfile = DeserializeAltitudeProfile(tour.AltitudeProfileJson, isEs),
            Itineraries = tour.Itineraries.Select(i => new ItineraryDayDto
            {
                Id = i.Id,
                DayNumber = i.DayNumber,
                Title = isEs ? i.TitleEs : i.TitleEn,
                Description = isEs ? i.DescriptionEs : i.DescriptionEn,
                GourmetDining = isEs ? i.GourmetDiningEs : i.GourmetDiningEn,
                PrivateTransfer = isEs ? i.PrivateTransferEs : i.PrivateTransferEn
            }).ToList()
        };

        return Ok(detail);
    }

    private static List<string> DeserializeList(string? json)
    {
        if (string.IsNullOrWhiteSpace(json)) return new List<string>();
        try
        {
            return JsonSerializer.Deserialize<List<string>>(json) ?? new List<string>();
        }
        catch
        {
            return new List<string>();
        }
    }

    private static AltitudeProfileDto? DeserializeAltitudeProfile(string? json, bool isEs)
    {
        if (string.IsNullOrWhiteSpace(json) || json == "{}") return null;
        try
        {
            using var doc = JsonDocument.Parse(json);
            var root = doc.RootElement;
            return new AltitudeProfileDto
            {
                StartingAltitude = root.TryGetProperty("startingAltitude", out var s) ? s.GetString() ?? "" : "",
                MaxAltitude = root.TryGetProperty("maxAltitude", out var m) ? m.GetString() ?? "" : "",
                SleepingAltitude = root.TryGetProperty("sleepingAltitude", out var sl) ? sl.GetString() ?? "" : "",
                OxygenPercentage = root.TryGetProperty("oxygenPercentage", out var o) ? o.GetInt32() : 85,
                AcclimatizationTip = root.TryGetProperty(isEs ? "tipEs" : "tipEn", out var t) ? t.GetString() ?? "" : ""
            };
        }
        catch
        {
            return null;
        }
    }
}
