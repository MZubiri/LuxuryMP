using System.Net;
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

    [EnableRateLimiting("contact-policy")]
    [HttpPost("inquire")]
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

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories([FromQuery] string lang = "en")
    {
        var isEs = string.Equals(lang, "es", StringComparison.OrdinalIgnoreCase);

        var list = await _context.Categories
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
                ToursCount = c.Tours.Count(t => t.IsActive)
            })
            .ToListAsync();

        return Ok(list);
    }
}
