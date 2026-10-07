using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using LuxuryMachupicchu.API.DTOs;
using LuxuryMachupicchu.Domain.Entities;
using LuxuryMachupicchu.Infrastructure.Data;

namespace LuxuryMachupicchu.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ConciergeController : ControllerBase
{
    private readonly LuxuryMachupicchuDbContext _context;
    private readonly IConfiguration _configuration;

    public ConciergeController(LuxuryMachupicchuDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    /// <summary>
    /// Public endpoint: guest submits an ultra-luxury bespoke itinerary inquiry.
    /// </summary>
    [HttpPost("inquire")]
    [AllowAnonymous]
    [EnableRateLimiting("contact-policy")]
    public async Task<IActionResult> SubmitBespokeInquiry([FromBody] CreateConciergeRequestDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var req = new PrivateConciergeRequest
        {
            GuestName = dto.GuestName.Trim(),
            Email = dto.Email.Trim().ToLower(),
            WhatsApp = dto.WhatsApp.Trim(),
            DestinationFocus = dto.DestinationFocus,
            JourneyDuration = dto.JourneyDuration,
            TravelersCount = dto.TravelersCount,
            BudgetTier = dto.BudgetTier,
            BespokeNotes = dto.BespokeNotes?.Trim() ?? string.Empty,
            CreatedAt = DateTime.UtcNow,
            IsAddressed = false
        };

        await _context.ConciergeRequests.AddAsync(req);
        await _context.SaveChangesAsync();

        var whatsappNumber = _configuration["AgencySettings:WhatsAppNumber"] ?? "51958195840";
        var isEs = string.Equals(dto.PreferredLanguage, "es", StringComparison.OrdinalIgnoreCase);

        var waText = isEs
            ? $"🎩 *Luxury Machupicchu Peru - Solicitud de Concierge Privé*\n\n" +
              $"Nombre: *{dto.GuestName}*\n" +
              $"Destino: *{dto.DestinationFocus}*\n" +
              $"Duración: *{dto.JourneyDuration}*\n" +
              $"Viajeros: *{dto.TravelersCount} personas*\n" +
              $"Categoría: *{dto.BudgetTier}*\n" +
              (!string.IsNullOrWhiteSpace(dto.BespokeNotes) ? $"Notas del Huésped: {dto.BespokeNotes}\n" : "") +
              $"\nDeseo diseñar un itinerario privado de alta gama a medida."
            : $"🎩 *Luxury Machupicchu Peru - Bespoke Concierge Request*\n\n" +
              $"Guest: *{dto.GuestName}*\n" +
              $"Destination: *{dto.DestinationFocus}*\n" +
              $"Duration: *{dto.JourneyDuration}*\n" +
              $"Travelers: *{dto.TravelersCount} guests*\n" +
              $"Tier: *{dto.BudgetTier}*\n" +
              (!string.IsNullOrWhiteSpace(dto.BespokeNotes) ? $"Special Notes: {dto.BespokeNotes}\n" : "") +
              $"\nI wish to craft a custom ultra-luxury itinerary.";

        var waUrl = $"https://wa.me/{whatsappNumber}?text={WebUtility.UrlEncode(waText)}";

        return Ok(new
        {
            success = true,
            id = req.Id,
            message = isEs ? "Solicitud de Concierge recibida con distinción." : "Concierge request received with distinction.",
            whatsAppUrl = waUrl
        });
    }

    /// <summary>
    /// Admin endpoint: lists bespoke concierge leads with search, filter, and pagination.
    /// </summary>
    [HttpGet]
    [Authorize(Roles = "Administrator")]
    public async Task<ActionResult<PaginatedResponse<ConciergeRequestDto>>> GetConciergeRequests(
        [FromQuery] bool? isAddressed,
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _context.ConciergeRequests.AsNoTracking().AsQueryable();

        if (isAddressed.HasValue)
        {
            query = query.Where(r => r.IsAddressed == isAddressed.Value);
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLower();
            query = query.Where(r => r.GuestName.ToLower().Contains(term) ||
                                     r.Email.ToLower().Contains(term) ||
                                     r.WhatsApp.ToLower().Contains(term) ||
                                     r.DestinationFocus.ToLower().Contains(term) ||
                                     r.BudgetTier.ToLower().Contains(term) ||
                                     r.BespokeNotes.ToLower().Contains(term));
        }

        var totalItems = await query.CountAsync();

        var items = await query
            .OrderByDescending(r => r.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
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

        return Ok(new PaginatedResponse<ConciergeRequestDto>
        {
            TotalItems = totalItems,
            Page = page,
            PageSize = pageSize,
            Items = items
        });
    }

    /// <summary>
    /// Admin endpoint: gets details of a single concierge request.
    /// </summary>
    [HttpGet("{id}")]
    [Authorize(Roles = "Administrator")]
    public async Task<ActionResult<ConciergeRequestDto>> GetConciergeRequest(int id)
    {
        var r = await _context.ConciergeRequests.FindAsync(id);
        if (r == null)
        {
            return NotFound(new { message = $"Concierge request #{id} not found." });
        }

        return Ok(new ConciergeRequestDto
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
        });
    }

    /// <summary>
    /// Admin endpoint: marks a concierge request as addressed or pending.
    /// </summary>
    [HttpPut("{id}/addressed")]
    [HttpPatch("{id}/addressed")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> UpdateAddressedStatus(int id, [FromBody] UpdateConciergeStatusDto dto)
    {
        var req = await _context.ConciergeRequests.FindAsync(id);
        if (req == null)
        {
            return NotFound(new { message = $"Concierge request #{id} not found." });
        }

        req.IsAddressed = dto.IsAddressed;
        await _context.SaveChangesAsync();

        return Ok(new
        {
            success = true,
            id = req.Id,
            isAddressed = req.IsAddressed,
            message = req.IsAddressed ? "Request marked as addressed." : "Request marked as pending."
        });
    }

    /// <summary>
    /// Admin endpoint: deletes a concierge request.
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> DeleteConciergeRequest(int id)
    {
        var req = await _context.ConciergeRequests.FindAsync(id);
        if (req == null)
        {
            return NotFound(new { message = $"Concierge request #{id} not found." });
        }

        _context.ConciergeRequests.Remove(req);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = $"Concierge request #{id} removed." });
    }

    private static string BuildConciergeWhatsAppReply(string phone, string guestName)
    {
        var digits = new string(phone.Where(char.IsDigit).ToArray());
        if (string.IsNullOrWhiteSpace(digits)) return string.Empty;

        var message = $"Dear {guestName}, this is the Director of Concierge at Luxury Machupicchu Peru regarding your bespoke travel inquiry.";
        return $"https://wa.me/{digits}?text={WebUtility.UrlEncode(message)}";
    }
}

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly LuxuryMachupicchuDbContext _context;

    public CategoriesController(LuxuryMachupicchuDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Public endpoint: retrieves active expedition categories.
    /// </summary>
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories([FromQuery] string lang = "en")
    {
        var isEs = string.Equals(lang, "es", StringComparison.OrdinalIgnoreCase);

        var list = await _context.Categories
            .AsNoTracking()
            .Where(c => c.IsActive)
            .OrderBy(c => c.DisplayOrder)
            .Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = isEs ? c.NameEs : c.NameEn,
                Slug = c.Slug,
                Description = isEs ? c.DescriptionEs : c.DescriptionEn,
                Icon = c.Icon,
                DisplayOrder = c.DisplayOrder,
                ToursCount = c.Tours.Count(t => t.IsActive),
                IsActive = c.IsActive
            })
            .ToListAsync();

        return Ok(list);
    }

    /// <summary>
    /// Admin endpoint: retrieves all categories including inactive ones.
    /// </summary>
    [HttpGet("admin/all")]
    [Authorize(Roles = "Administrator")]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAllCategoriesAdmin()
    {
        var list = await _context.Categories
            .AsNoTracking()
            .OrderBy(c => c.DisplayOrder)
            .Select(c => new CategoryDto
            {
                Id = c.Id,
                Name = c.NameEn + " / " + c.NameEs,
                Slug = c.Slug,
                Description = c.DescriptionEn,
                Icon = c.Icon,
                DisplayOrder = c.DisplayOrder,
                ToursCount = c.Tours.Count(),
                IsActive = c.IsActive
            })
            .ToListAsync();

        return Ok(list);
    }

    /// <summary>
    /// Admin endpoint: creates a new expedition category.
    /// </summary>
    [HttpPost]
    [Authorize(Roles = "Administrator")]
    public async Task<ActionResult<CategoryDto>> CreateCategory([FromBody] CreateCategoryDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var slug = dto.Slug.Trim().ToLower();
        if (await _context.Categories.AnyAsync(c => c.Slug == slug))
        {
            return Conflict(new { message = $"Category with slug '{slug}' already exists." });
        }

        var cat = new Category
        {
            NameEn = dto.NameEn.Trim(),
            NameEs = dto.NameEs.Trim(),
            Slug = slug,
            DescriptionEn = dto.DescriptionEn.Trim(),
            DescriptionEs = dto.DescriptionEs.Trim(),
            Icon = string.IsNullOrWhiteSpace(dto.Icon) ? "compass" : dto.Icon.Trim(),
            DisplayOrder = dto.DisplayOrder,
            IsActive = dto.IsActive
        };

        await _context.Categories.AddAsync(cat);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCategories), new { id = cat.Id }, new CategoryDto
        {
            Id = cat.Id,
            Name = cat.NameEn,
            Slug = cat.Slug,
            Description = cat.DescriptionEn,
            Icon = cat.Icon,
            DisplayOrder = cat.DisplayOrder,
            ToursCount = 0,
            IsActive = cat.IsActive
        });
    }

    /// <summary>
    /// Admin endpoint: updates an existing category.
    /// </summary>
    [HttpPut("{id}")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> UpdateCategory(int id, [FromBody] UpdateCategoryDto dto)
    {
        var cat = await _context.Categories.FindAsync(id);
        if (cat == null) return NotFound(new { message = $"Category #{id} not found." });

        if (!string.IsNullOrWhiteSpace(dto.NameEn)) cat.NameEn = dto.NameEn.Trim();
        if (!string.IsNullOrWhiteSpace(dto.NameEs)) cat.NameEs = dto.NameEs.Trim();
        if (!string.IsNullOrWhiteSpace(dto.Slug))
        {
            var slug = dto.Slug.Trim().ToLower();
            if (await _context.Categories.AnyAsync(c => c.Slug == slug && c.Id != id))
            {
                return Conflict(new { message = $"Category slug '{slug}' is already taken." });
            }
            cat.Slug = slug;
        }
        if (dto.DescriptionEn != null) cat.DescriptionEn = dto.DescriptionEn.Trim();
        if (dto.DescriptionEs != null) cat.DescriptionEs = dto.DescriptionEs.Trim();
        if (!string.IsNullOrWhiteSpace(dto.Icon)) cat.Icon = dto.Icon.Trim();
        if (dto.DisplayOrder.HasValue) cat.DisplayOrder = dto.DisplayOrder.Value;
        if (dto.IsActive.HasValue) cat.IsActive = dto.IsActive.Value;

        await _context.SaveChangesAsync();
        return Ok(new { success = true, id = cat.Id, message = "Category updated successfully." });
    }

    /// <summary>
    /// Admin endpoint: deletes or deactivates a category.
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var cat = await _context.Categories.Include(c => c.Tours).FirstOrDefaultAsync(c => c.Id == id);
        if (cat == null) return NotFound(new { message = $"Category #{id} not found." });

        if (cat.Tours.Any())
        {
            return BadRequest(new { message = $"Cannot delete category '{cat.NameEn}' because it has {cat.Tours.Count} associated tour(s). Deactivate it or reassign tours first." });
        }

        _context.Categories.Remove(cat);
        await _context.SaveChangesAsync();
        return Ok(new { success = true, message = $"Category #{id} deleted." });
    }
}
