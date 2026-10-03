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
public class BookingsController : ControllerBase
{
    private readonly LuxuryMachupicchuDbContext _context;
    private readonly IConfiguration _configuration;

    public BookingsController(LuxuryMachupicchuDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [EnableRateLimiting("contact-policy")]
    [HttpPost]
    public async Task<ActionResult<BookingInquiryResponseDto>> CreateInquiry([FromBody] CreateBookingInquiryDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var tour = await _context.Tours.FindAsync(dto.TourId);
        if (tour == null)
        {
            return NotFound(new { message = $"Tour with ID {dto.TourId} does not exist." });
        }

        var guests = Math.Max(1, dto.NumberOfGuests);
        var totalUsd = tour.PriceUsd * guests;
        var totalPen = tour.PricePen * guests;

        var inquiry = new BookingInquiry
        {
            TourId = tour.Id,
            FullName = dto.FullName.Trim(),
            Email = dto.Email.Trim().ToLower(),
            Phone = dto.Phone.Trim(),
            Country = dto.Country?.Trim() ?? string.Empty,
            NumberOfGuests = guests,
            TravelDate = dto.TravelDate,
            TrainPreference = dto.TrainPreference ?? "Belmond Hiram Bingham",
            SpecialRequests = dto.SpecialRequests?.Trim() ?? string.Empty,
            PreferredLanguage = dto.PreferredLanguage ?? "en",
            EstimatedTotalUsd = totalUsd,
            EstimatedTotalPen = totalPen,
            Status = "Pending",
            CreatedAt = DateTime.UtcNow
        };

        await _context.BookingInquiries.AddAsync(inquiry);
        await _context.SaveChangesAsync();

        var whatsappNumber = _configuration["AgencySettings:WhatsAppNumber"] ?? "51958195840";
        var isEs = string.Equals(dto.PreferredLanguage, "es", StringComparison.OrdinalIgnoreCase);

        var tourTitle = isEs ? tour.TitleEs : tour.TitleEn;
        var dateFormatted = dto.TravelDate.HasValue ? dto.TravelDate.Value.ToString("dd/MM/yyyy") : (isEs ? "A coordinar" : "To be confirmed");

        var waText = isEs
            ? $"✨ *Luxury Machupicchu Peru - Solicitud de Reserva VIP*\n\n" +
              $"Estimado Concierge, mi nombre es *{dto.FullName}* ({dto.Country ?? "Viajero Internacional"}).\n\n" +
              $"🏛️ *Expedición:* {tourTitle}\n" +
              $"👥 *Huéspedes:* {guests} persona(s)\n" +
              $"📅 *Fecha de Viaje:* {dateFormatted}\n" +
              $"🚆 *Preferencia de Tren:* {dto.TrainPreference}\n" +
              $"💰 *Monto Estimado:* ${totalUsd:N2} USD / S/. {totalPen:N2} PEN\n" +
              (!string.IsNullOrWhiteSpace(dto.SpecialRequests) ? $"✉️ *Requerimientos Especiales:* {dto.SpecialRequests}\n" : "") +
              $"\nAgradeceré su pronta confirmación de disponibilidad exclusiva."
            : $"✨ *Luxury Machupicchu Peru - VIP Journey Inquiry*\n\n" +
              $"Dear Concierge, my name is *{dto.FullName}* ({dto.Country ?? "International Traveler"}).\n\n" +
              $"🏛️ *Expedition:* {tourTitle}\n" +
              $"👥 *Guests:* {guests} traveler(s)\n" +
              $"📅 *Target Date:* {dateFormatted}\n" +
              $"🚆 *Train Service:* {dto.TrainPreference}\n" +
              $"💰 *Estimated Quote:* ${totalUsd:N2} USD / S/. {totalPen:N2} PEN\n" +
              (!string.IsNullOrWhiteSpace(dto.SpecialRequests) ? $"✉️ *Special Requests:* {dto.SpecialRequests}\n" : "") +
              $"\nI await your confirmation regarding journey availability and official sanctuary reservations.";

        var waUrl = $"https://wa.me/{whatsappNumber}?text={WebUtility.UrlEncode(waText)}";

        return Ok(new BookingInquiryResponseDto
        {
            Id = inquiry.Id,
            FullName = inquiry.FullName,
            TourTitle = tourTitle,
            EstimatedTotalUsd = totalUsd,
            EstimatedTotalPen = totalPen,
            Status = inquiry.Status,
            CreatedAt = inquiry.CreatedAt,
            WhatsAppDirectUrl = waUrl
        });
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BookingInquiryResponseDto>> GetInquiry(int id)
    {
        var inquiry = await _context.BookingInquiries
            .Include(b => b.Tour)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (inquiry == null) return NotFound();

        return Ok(new BookingInquiryResponseDto
        {
            Id = inquiry.Id,
            FullName = inquiry.FullName,
            TourTitle = inquiry.Tour?.TitleEn ?? "Bespoke Journey",
            EstimatedTotalUsd = inquiry.EstimatedTotalUsd,
            EstimatedTotalPen = inquiry.EstimatedTotalPen,
            Status = inquiry.Status,
            CreatedAt = inquiry.CreatedAt,
            WhatsAppDirectUrl = string.Empty
        });
    }
}
