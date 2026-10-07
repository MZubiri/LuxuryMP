using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
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

    /// <summary>
    /// Public endpoint: retrieves active luxury expeditions with optional filters.
    /// </summary>
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<TourSummaryDto>>> GetTours(
        [FromQuery] string? category,
        [FromQuery] bool? featured,
        [FromQuery] string? search,
        [FromQuery] string lang = "en")
    {
        var isEs = string.Equals(lang, "es", StringComparison.OrdinalIgnoreCase);

        var query = _context.Tours
            .Include(t => t.Category)
            .Include(t => t.Itineraries)
            .Where(t => t.IsActive)
            .AsNoTracking()
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
            TitleEn = t.TitleEn,
            TitleEs = t.TitleEs,
            Slug = t.Slug,
            Subtitle = isEs ? t.SubtitleEs : t.SubtitleEn,
            SubtitleEn = t.SubtitleEn,
            SubtitleEs = t.SubtitleEs,
            Description = isEs ? t.DescriptionEs : t.DescriptionEn,
            DescriptionEn = t.DescriptionEn,
            DescriptionEs = t.DescriptionEs,
            CategoryId = t.CategoryId,
            CategoryName = t.Category != null ? (isEs ? t.Category.NameEs : t.Category.NameEn) : string.Empty,
            CategoryNameEn = t.Category != null ? t.Category.NameEn : string.Empty,
            CategoryNameEs = t.Category != null ? t.Category.NameEs : string.Empty,
            CategorySlug = t.Category?.Slug ?? string.Empty,
            Duration = isEs ? t.DurationEs : t.DurationEn,
            DurationEn = t.DurationEn,
            DurationEs = t.DurationEs,
            DurationDays = t.DurationDays,
            PriceUsd = t.PriceUsd,
            PricePen = t.PricePen,
            Difficulty = isEs ? t.DifficultyEs : t.DifficultyEn,
            DifficultyEn = t.DifficultyEn,
            DifficultyEs = t.DifficultyEs,
            AltitudeMax = t.AltitudeMax,
            StartingPoint = t.StartingPoint,
            StyleTag = t.StyleTag,
            Featured = t.Featured,
            IsActive = t.IsActive,
            DisplayOrder = t.DisplayOrder,
            MainImageUrl = t.MainImageUrl,
            Highlights = DeserializeList(isEs ? t.HighlightsJsonEs : t.HighlightsJsonEn),
            HighlightsEn = DeserializeList(t.HighlightsJsonEn),
            HighlightsEs = DeserializeList(t.HighlightsJsonEs),
            Itineraries = t.Itineraries.OrderBy(i => i.DayNumber).Select(i => new ItineraryDayDto
            {
                Id = i.Id,
                DayNumber = i.DayNumber,
                Title = isEs ? i.TitleEs : i.TitleEn,
                TitleEn = i.TitleEn,
                TitleEs = i.TitleEs,
                Description = isEs ? i.DescriptionEs : i.DescriptionEn,
                DescriptionEn = i.DescriptionEn,
                DescriptionEs = i.DescriptionEs,
                GourmetDining = isEs ? i.GourmetDiningEs : i.GourmetDiningEn,
                GourmetDiningEn = i.GourmetDiningEn,
                GourmetDiningEs = i.GourmetDiningEs,
                PrivateTransfer = isEs ? i.PrivateTransferEs : i.PrivateTransferEn,
                PrivateTransferEn = i.PrivateTransferEn,
                PrivateTransferEs = i.PrivateTransferEs
            }).ToList()
        }).ToList();

        return Ok(result);
    }

    /// <summary>
    /// Public endpoint: retrieves featured journeys.
    /// </summary>
    [HttpGet("featured")]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<TourSummaryDto>>> GetFeatured([FromQuery] string lang = "en")
    {
        return await GetTours(null, true, null, lang);
    }

    /// <summary>
    /// Public endpoint: retrieves full details of an expedition by its slug or ID.
    /// </summary>
    [HttpGet("{slug}")]
    [AllowAnonymous]
    public async Task<ActionResult<TourDetailDto>> GetTourBySlug(string slug, [FromQuery] string lang = "en")
    {
        var isEs = string.Equals(lang, "es", StringComparison.OrdinalIgnoreCase);
        var isNumeric = int.TryParse(slug, out int tourId);

        var tour = await _context.Tours
            .Include(t => t.Category)
            .Include(t => t.Itineraries.OrderBy(i => i.DayNumber))
            .AsNoTracking()
            .FirstOrDefaultAsync(t => (t.Slug == slug || (isNumeric && t.Id == tourId)) && t.IsActive);

        if (tour == null)
        {
            return NotFound(new { message = $"Expedition '{slug}' not found." });
        }

        var detail = new TourDetailDto
        {
            Id = tour.Id,
            Title = isEs ? tour.TitleEs : tour.TitleEn,
            TitleEn = tour.TitleEn,
            TitleEs = tour.TitleEs,
            Slug = tour.Slug,
            Subtitle = isEs ? tour.SubtitleEs : tour.SubtitleEn,
            SubtitleEn = tour.SubtitleEn,
            SubtitleEs = tour.SubtitleEs,
            Description = isEs ? tour.DescriptionEs : tour.DescriptionEn,
            DescriptionEn = tour.DescriptionEn,
            DescriptionEs = tour.DescriptionEs,
            CategoryId = tour.CategoryId,
            CategoryName = tour.Category != null ? (isEs ? tour.Category.NameEs : tour.Category.NameEn) : string.Empty,
            CategoryNameEn = tour.Category != null ? tour.Category.NameEn : string.Empty,
            CategoryNameEs = tour.Category != null ? tour.Category.NameEs : string.Empty,
            CategorySlug = tour.Category?.Slug ?? string.Empty,
            Duration = isEs ? tour.DurationEs : tour.DurationEn,
            DurationEn = tour.DurationEn,
            DurationEs = tour.DurationEs,
            DurationDays = tour.DurationDays,
            PriceUsd = tour.PriceUsd,
            PricePen = tour.PricePen,
            Difficulty = isEs ? tour.DifficultyEs : tour.DifficultyEn,
            DifficultyEn = tour.DifficultyEn,
            DifficultyEs = tour.DifficultyEs,
            AltitudeMax = tour.AltitudeMax,
            StartingPoint = tour.StartingPoint,
            StyleTag = tour.StyleTag,
            Featured = tour.Featured,
            IsActive = tour.IsActive,
            DisplayOrder = tour.DisplayOrder,
            MainImageUrl = tour.MainImageUrl,
            GalleryImages = DeserializeList(tour.GalleryImagesJson),
            Highlights = DeserializeList(isEs ? tour.HighlightsJsonEs : tour.HighlightsJsonEn),
            HighlightsEn = DeserializeList(tour.HighlightsJsonEn),
            HighlightsEs = DeserializeList(tour.HighlightsJsonEs),
            Included = DeserializeList(isEs ? tour.IncludedJsonEs : tour.IncludedJsonEn),
            IncludedEn = DeserializeList(tour.IncludedJsonEn),
            IncludedEs = DeserializeList(tour.IncludedJsonEs),
            NotIncluded = DeserializeList(isEs ? tour.NotIncludedJsonEs : tour.NotIncludedJsonEn),
            NotIncludedEn = DeserializeList(tour.NotIncludedJsonEn),
            NotIncludedEs = DeserializeList(tour.NotIncludedJsonEs),
            Locations = DeserializeList(tour.LocationsJson),
            AltitudeProfile = DeserializeAltitudeProfile(tour.AltitudeProfileJson, isEs),
            Itineraries = tour.Itineraries.Select(i => new ItineraryDayDto
            {
                Id = i.Id,
                DayNumber = i.DayNumber,
                Title = isEs ? i.TitleEs : i.TitleEn,
                TitleEn = i.TitleEn,
                TitleEs = i.TitleEs,
                Description = isEs ? i.DescriptionEs : i.DescriptionEn,
                DescriptionEn = i.DescriptionEn,
                DescriptionEs = i.DescriptionEs,
                GourmetDining = isEs ? i.GourmetDiningEs : i.GourmetDiningEn,
                GourmetDiningEn = i.GourmetDiningEn,
                GourmetDiningEs = i.GourmetDiningEs,
                PrivateTransfer = isEs ? i.PrivateTransferEs : i.PrivateTransferEn,
                PrivateTransferEn = i.PrivateTransferEn,
                PrivateTransferEs = i.PrivateTransferEs
            }).ToList()
        };

        return Ok(detail);
    }

    /// <summary>
    /// Admin endpoint: retrieves all expeditions (both active and inactive) for management table.
    /// </summary>
    [HttpGet("admin/all")]
    [Authorize(Roles = "Administrator")]
    public async Task<ActionResult<IEnumerable<TourSummaryDto>>> GetAllToursAdmin()
    {
        var tours = await _context.Tours
            .Include(t => t.Category)
            .AsNoTracking()
            .OrderBy(t => t.DisplayOrder)
            .Select(t => new TourSummaryDto
            {
                Id = t.Id,
                Title = t.TitleEn,
                TitleEn = t.TitleEn,
                TitleEs = t.TitleEs,
                Slug = t.Slug,
                Subtitle = t.SubtitleEn,
                Description = t.DescriptionEn,
                CategoryId = t.CategoryId,
                CategoryName = t.Category != null ? t.Category.NameEn : string.Empty,
                CategoryNameEn = t.Category != null ? t.Category.NameEn : string.Empty,
                CategoryNameEs = t.Category != null ? t.Category.NameEs : string.Empty,
                CategorySlug = t.Category != null ? t.Category.Slug : string.Empty,
                Duration = t.DurationEn,
                DurationEn = t.DurationEn,
                DurationEs = t.DurationEs,
                DurationDays = t.DurationDays,
                PriceUsd = t.PriceUsd,
                PricePen = t.PricePen,
                Difficulty = t.DifficultyEn,
                DifficultyEn = t.DifficultyEn,
                AltitudeMax = t.AltitudeMax,
                StartingPoint = t.StartingPoint,
                StyleTag = t.StyleTag,
                Featured = t.Featured,
                IsActive = t.IsActive,
                DisplayOrder = t.DisplayOrder,
                InquiriesCount = _context.BookingInquiries.Count(b => b.TourId == t.Id),
                MainImageUrl = t.MainImageUrl,
                Highlights = new List<string>()
            })
            .ToListAsync();

        return Ok(tours);
    }

    /// <summary>
    /// Admin endpoint: retrieves full tour entity and raw fields by ID for editing.
    /// </summary>
    [HttpGet("admin/{id}")]
    [Authorize(Roles = "Administrator")]
    public async Task<ActionResult<AdminTourDetailDto>> GetTourAdminById(int id)
    {
        var tour = await _context.Tours
            .Include(t => t.Category)
            .Include(t => t.Itineraries.OrderBy(i => i.DayNumber))
            .Include(t => t.BookingInquiries)
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == id);

        if (tour == null)
        {
            return NotFound(new { message = $"Expedition #{id} not found." });
        }

        var dto = new AdminTourDetailDto
        {
            Id = tour.Id,
            TitleEn = tour.TitleEn,
            TitleEs = tour.TitleEs,
            Slug = tour.Slug,
            SubtitleEn = tour.SubtitleEn,
            SubtitleEs = tour.SubtitleEs,
            DescriptionEn = tour.DescriptionEn,
            DescriptionEs = tour.DescriptionEs,
            CategoryId = tour.CategoryId,
            CategoryNameEn = tour.Category?.NameEn ?? string.Empty,
            CategoryNameEs = tour.Category?.NameEs ?? string.Empty,
            CategorySlug = tour.Category?.Slug ?? string.Empty,
            DurationEn = tour.DurationEn,
            DurationEs = tour.DurationEs,
            DurationDays = tour.DurationDays,
            PriceUsd = tour.PriceUsd,
            PricePen = tour.PricePen,
            DifficultyEn = tour.DifficultyEn,
            DifficultyEs = tour.DifficultyEs,
            AltitudeMax = tour.AltitudeMax,
            StartingPoint = tour.StartingPoint,
            StyleTag = tour.StyleTag,
            Featured = tour.Featured,
            IsActive = tour.IsActive,
            DisplayOrder = tour.DisplayOrder,
            MainImageUrl = tour.MainImageUrl,
            GalleryImages = DeserializeList(tour.GalleryImagesJson),
            IncludedEn = DeserializeList(tour.IncludedJsonEn),
            IncludedEs = DeserializeList(tour.IncludedJsonEs),
            NotIncludedEn = DeserializeList(tour.NotIncludedJsonEn),
            NotIncludedEs = DeserializeList(tour.NotIncludedJsonEs),
            HighlightsEn = DeserializeList(tour.HighlightsJsonEn),
            HighlightsEs = DeserializeList(tour.HighlightsJsonEs),
            Locations = DeserializeList(tour.LocationsJson),
            AltitudeProfileJson = tour.AltitudeProfileJson,
            Itineraries = tour.Itineraries.Select(i => new ItineraryDayDto
            {
                Id = i.Id,
                DayNumber = i.DayNumber,
                Title = i.TitleEn,
                TitleEn = i.TitleEn,
                TitleEs = i.TitleEs,
                Description = i.DescriptionEn,
                DescriptionEn = i.DescriptionEn,
                DescriptionEs = i.DescriptionEs,
                GourmetDining = i.GourmetDiningEn,
                GourmetDiningEn = i.GourmetDiningEn,
                GourmetDiningEs = i.GourmetDiningEs,
                PrivateTransfer = i.PrivateTransferEn,
                PrivateTransferEn = i.PrivateTransferEn,
                PrivateTransferEs = i.PrivateTransferEs
            }).ToList(),
            InquiriesCount = tour.BookingInquiries.Count
        };

        return Ok(dto);
    }

    /// <summary>
    /// Admin endpoint: creates a new luxury tour.
    /// </summary>
    [HttpPost]
    [Authorize(Roles = "Administrator")]
    public async Task<ActionResult<AdminTourDetailDto>> CreateTour([FromBody] CreateTourDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var slug = string.IsNullOrWhiteSpace(dto.Slug)
            ? GenerateSlug(dto.TitleEn)
            : GenerateSlug(dto.Slug);

        if (await _context.Tours.AnyAsync(t => t.Slug == slug))
        {
            slug = $"{slug}-{DateTime.UtcNow.Ticks % 10000}";
        }

        var category = await _context.Categories.FindAsync(dto.CategoryId);
        if (category == null)
        {
            return BadRequest(new { message = $"Category #{dto.CategoryId} does not exist." });
        }

        var tour = new Tour
        {
            TitleEn = dto.TitleEn.Trim(),
            TitleEs = dto.TitleEs.Trim(),
            Slug = slug,
            SubtitleEn = dto.SubtitleEn?.Trim() ?? string.Empty,
            SubtitleEs = dto.SubtitleEs?.Trim() ?? string.Empty,
            DescriptionEn = dto.DescriptionEn?.Trim() ?? string.Empty,
            DescriptionEs = dto.DescriptionEs?.Trim() ?? string.Empty,
            CategoryId = dto.CategoryId,
            DurationEn = dto.DurationEn?.Trim() ?? "Full Day",
            DurationEs = dto.DurationEs?.Trim() ?? "Día Completo",
            DurationDays = Math.Max(1, dto.DurationDays),
            PriceUsd = dto.PriceUsd,
            PricePen = dto.PricePen,
            DifficultyEn = dto.DifficultyEn?.Trim() ?? "Leisure",
            DifficultyEs = dto.DifficultyEs?.Trim() ?? "Exclusivo / Suave",
            AltitudeMax = dto.AltitudeMax?.Trim() ?? "2,430 m / 7,972 ft",
            StartingPoint = dto.StartingPoint?.Trim() ?? "Cusco / Sacred Valley",
            StyleTag = dto.StyleTag?.Trim() ?? "Ultra-Luxury",
            Featured = dto.Featured,
            IsActive = dto.IsActive,
            DisplayOrder = dto.DisplayOrder,
            MainImageUrl = dto.MainImageUrl?.Trim() ?? string.Empty,
            GalleryImagesJson = JsonSerializer.Serialize(dto.GalleryImages ?? new List<string>()),
            IncludedJsonEn = JsonSerializer.Serialize(dto.IncludedEn ?? new List<string>()),
            IncludedJsonEs = JsonSerializer.Serialize(dto.IncludedEs ?? new List<string>()),
            NotIncludedJsonEn = JsonSerializer.Serialize(dto.NotIncludedEn ?? new List<string>()),
            NotIncludedJsonEs = JsonSerializer.Serialize(dto.NotIncludedEs ?? new List<string>()),
            HighlightsJsonEn = JsonSerializer.Serialize(dto.HighlightsEn ?? new List<string>()),
            HighlightsJsonEs = JsonSerializer.Serialize(dto.HighlightsEs ?? new List<string>()),
            LocationsJson = JsonSerializer.Serialize(dto.Locations ?? new List<string>()),
            AltitudeProfileJson = string.IsNullOrWhiteSpace(dto.AltitudeProfileJson) ? "{}" : dto.AltitudeProfileJson
        };

        if (dto.Itineraries != null && dto.Itineraries.Any())
        {
            foreach (var it in dto.Itineraries)
            {
                tour.Itineraries.Add(new ItineraryDay
                {
                    DayNumber = it.DayNumber,
                    TitleEn = it.TitleEn.Trim(),
                    TitleEs = it.TitleEs.Trim(),
                    DescriptionEn = it.DescriptionEn.Trim(),
                    DescriptionEs = it.DescriptionEs.Trim(),
                    GourmetDiningEn = it.GourmetDiningEn?.Trim() ?? string.Empty,
                    GourmetDiningEs = it.GourmetDiningEs?.Trim() ?? string.Empty,
                    PrivateTransferEn = it.PrivateTransferEn?.Trim() ?? string.Empty,
                    PrivateTransferEs = it.PrivateTransferEs?.Trim() ?? string.Empty
                });
            }
        }

        await _context.Tours.AddAsync(tour);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTourAdminById), new { id = tour.Id }, new AdminTourDetailDto
        {
            Id = tour.Id,
            TitleEn = tour.TitleEn,
            TitleEs = tour.TitleEs,
            Slug = tour.Slug,
            CategoryId = tour.CategoryId,
            CategoryNameEn = category.NameEn,
            DurationEn = tour.DurationEn,
            PriceUsd = tour.PriceUsd,
            PricePen = tour.PricePen,
            IsActive = tour.IsActive,
            Featured = tour.Featured,
            MainImageUrl = tour.MainImageUrl
        });
    }

    /// <summary>
    /// Admin endpoint: updates an existing tour.
    /// </summary>
    [HttpPut("{id}")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> UpdateTour(int id, [FromBody] UpdateTourDto dto)
    {
        var tour = await _context.Tours
            .Include(t => t.Itineraries)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (tour == null)
        {
            return NotFound(new { message = $"Expedition #{id} not found." });
        }

        if (!string.IsNullOrWhiteSpace(dto.Slug))
        {
            var slug = GenerateSlug(dto.Slug);
            if (await _context.Tours.AnyAsync(t => t.Slug == slug && t.Id != id))
            {
                return Conflict(new { message = $"Slug '{slug}' is already in use by another journey." });
            }
            tour.Slug = slug;
        }

        if (dto.CategoryId > 0 && dto.CategoryId != tour.CategoryId)
        {
            var exists = await _context.Categories.AnyAsync(c => c.Id == dto.CategoryId);
            if (!exists) return BadRequest(new { message = $"Category #{dto.CategoryId} does not exist." });
            tour.CategoryId = dto.CategoryId;
        }

        tour.TitleEn = dto.TitleEn.Trim();
        tour.TitleEs = dto.TitleEs.Trim();
        if (dto.SubtitleEn != null) tour.SubtitleEn = dto.SubtitleEn.Trim();
        if (dto.SubtitleEs != null) tour.SubtitleEs = dto.SubtitleEs.Trim();
        if (dto.DescriptionEn != null) tour.DescriptionEn = dto.DescriptionEn.Trim();
        if (dto.DescriptionEs != null) tour.DescriptionEs = dto.DescriptionEs.Trim();
        if (dto.DurationEn != null) tour.DurationEn = dto.DurationEn.Trim();
        if (dto.DurationEs != null) tour.DurationEs = dto.DurationEs.Trim();
        if (dto.DurationDays > 0) tour.DurationDays = dto.DurationDays;
        tour.PriceUsd = dto.PriceUsd;
        tour.PricePen = dto.PricePen;
        if (dto.DifficultyEn != null) tour.DifficultyEn = dto.DifficultyEn.Trim();
        if (dto.DifficultyEs != null) tour.DifficultyEs = dto.DifficultyEs.Trim();
        if (dto.AltitudeMax != null) tour.AltitudeMax = dto.AltitudeMax.Trim();
        if (dto.StartingPoint != null) tour.StartingPoint = dto.StartingPoint.Trim();
        if (dto.StyleTag != null) tour.StyleTag = dto.StyleTag.Trim();
        tour.Featured = dto.Featured;
        tour.IsActive = dto.IsActive;
        tour.DisplayOrder = dto.DisplayOrder;
        if (dto.MainImageUrl != null) tour.MainImageUrl = dto.MainImageUrl.Trim();

        if (dto.GalleryImages != null) tour.GalleryImagesJson = JsonSerializer.Serialize(dto.GalleryImages);
        if (dto.IncludedEn != null) tour.IncludedJsonEn = JsonSerializer.Serialize(dto.IncludedEn);
        if (dto.IncludedEs != null) tour.IncludedJsonEs = JsonSerializer.Serialize(dto.IncludedEs);
        if (dto.NotIncludedEn != null) tour.NotIncludedJsonEn = JsonSerializer.Serialize(dto.NotIncludedEn);
        if (dto.NotIncludedEs != null) tour.NotIncludedJsonEs = JsonSerializer.Serialize(dto.NotIncludedEs);
        if (dto.HighlightsEn != null) tour.HighlightsJsonEn = JsonSerializer.Serialize(dto.HighlightsEn);
        if (dto.HighlightsEs != null) tour.HighlightsJsonEs = JsonSerializer.Serialize(dto.HighlightsEs);
        if (dto.Locations != null) tour.LocationsJson = JsonSerializer.Serialize(dto.Locations);
        if (!string.IsNullOrWhiteSpace(dto.AltitudeProfileJson)) tour.AltitudeProfileJson = dto.AltitudeProfileJson;

        // Update itinerary days if provided
        if (dto.Itineraries != null)
        {
            _context.ItineraryDays.RemoveRange(tour.Itineraries);
            foreach (var it in dto.Itineraries)
            {
                tour.Itineraries.Add(new ItineraryDay
                {
                    TourId = tour.Id,
                    DayNumber = it.DayNumber,
                    TitleEn = it.TitleEn.Trim(),
                    TitleEs = it.TitleEs.Trim(),
                    DescriptionEn = it.DescriptionEn.Trim(),
                    DescriptionEs = it.DescriptionEs.Trim(),
                    GourmetDiningEn = it.GourmetDiningEn?.Trim() ?? string.Empty,
                    GourmetDiningEs = it.GourmetDiningEs?.Trim() ?? string.Empty,
                    PrivateTransferEn = it.PrivateTransferEn?.Trim() ?? string.Empty,
                    PrivateTransferEs = it.PrivateTransferEs?.Trim() ?? string.Empty
                });
            }
        }

        await _context.SaveChangesAsync();
        return Ok(new { success = true, id = tour.Id, message = "Tour updated successfully." });
    }

    /// <summary>
    /// Admin endpoint: toggles active status.
    /// </summary>
    [HttpPatch("{id}/toggle-status")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> ToggleStatus(int id)
    {
        var tour = await _context.Tours.FindAsync(id);
        if (tour == null) return NotFound(new { message = $"Expedition #{id} not found." });

        tour.IsActive = !tour.IsActive;
        await _context.SaveChangesAsync();

        return Ok(new { success = true, id = tour.Id, isActive = tour.IsActive });
    }

    /// <summary>
    /// Admin endpoint: toggles featured status.
    /// </summary>
    [HttpPatch("{id}/toggle-featured")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> ToggleFeatured(int id)
    {
        var tour = await _context.Tours.FindAsync(id);
        if (tour == null) return NotFound(new { message = $"Expedition #{id} not found." });

        tour.Featured = !tour.Featured;
        await _context.SaveChangesAsync();

        return Ok(new { success = true, id = tour.Id, featured = tour.Featured });
    }

    /// <summary>
    /// Admin endpoint: deletes or deactivates an expedition.
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> DeleteTour(int id)
    {
        var tour = await _context.Tours.Include(t => t.BookingInquiries).FirstOrDefaultAsync(t => t.Id == id);
        if (tour == null) return NotFound(new { message = $"Expedition #{id} not found." });

        if (tour.BookingInquiries.Any())
        {
            // Soft-deactivate if associated bookings exist to maintain historical integrity
            tour.IsActive = false;
            await _context.SaveChangesAsync();
            return Ok(new { success = true, message = $"Expedition #{id} has associated reservations and was safely deactivated." });
        }

        _context.Tours.Remove(tour);
        await _context.SaveChangesAsync();
        return Ok(new { success = true, message = $"Expedition #{id} permanently deleted." });
    }

    private static string GenerateSlug(string title)
    {
        var clean = title.ToLower().Trim();
        var chars = clean.Select(c => char.IsLetterOrDigit(c) ? c : '-').ToArray();
        var str = new string(chars);
        while (str.Contains("--")) str = str.Replace("--", "-");
        return str.Trim('-');
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
