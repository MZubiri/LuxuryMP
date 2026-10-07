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
public class BookingsController : ControllerBase
{
    private readonly LuxuryMachupicchuDbContext _context;
    private readonly IConfiguration _configuration;

    public BookingsController(LuxuryMachupicchuDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    /// <summary>
    /// Public endpoint: creates a luxury journey inquiry and generates an instant WhatsApp VIP link.
    /// </summary>
    [HttpPost]
    [AllowAnonymous]
    [EnableRateLimiting("contact-policy")]
    public async Task<ActionResult<BookingInquiryResponseDto>> CreateInquiry([FromBody] CreateBookingInquiryDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var tour = await _context.Tours.FindAsync(dto.TourId);
        if (tour == null)
        {
            return NotFound(new { message = $"Expedition with ID {dto.TourId} does not exist." });
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

    /// <summary>
    /// Admin endpoint: lists luxury bookings with filters, search, and pagination.
    /// </summary>
    [HttpGet]
    [Authorize(Roles = "Administrator,Editor")]
    public async Task<ActionResult<PaginatedResponse<AdminBookingDetailDto>>> GetBookings(
        [FromQuery] string? status,
        [FromQuery] string? search,
        [FromQuery] DateTime? fromDate,
        [FromQuery] DateTime? toDate,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _context.BookingInquiries
            .Include(b => b.Tour)
            .AsNoTracking()
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(status))
        {
            var s = status.Trim();
            query = query.Where(b => b.Status.ToLower() == s.ToLower());
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLower();
            query = query.Where(b => b.FullName.ToLower().Contains(term) ||
                                     b.Email.ToLower().Contains(term) ||
                                     b.Phone.ToLower().Contains(term) ||
                                     b.Country.ToLower().Contains(term) ||
                                     (b.Tour != null && (b.Tour.TitleEn.ToLower().Contains(term) || b.Tour.TitleEs.ToLower().Contains(term))));
        }

        if (fromDate.HasValue)
        {
            query = query.Where(b => b.CreatedAt >= fromDate.Value);
        }

        if (toDate.HasValue)
        {
            query = query.Where(b => b.CreatedAt <= toDate.Value);
        }

        var totalItems = await query.CountAsync();

        var items = await query
            .OrderByDescending(b => b.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
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

        return Ok(new PaginatedResponse<AdminBookingDetailDto>
        {
            TotalItems = totalItems,
            Page = page,
            PageSize = pageSize,
            Items = items
        });
    }

    /// <summary>
    /// Admin endpoint: retrieves full details of a specific booking.
    /// </summary>
    [HttpGet("{id}")]
    [Authorize(Roles = "Administrator,Editor")]
    public async Task<ActionResult<AdminBookingDetailDto>> GetBooking(int id)
    {
        var b = await _context.BookingInquiries
            .Include(x => x.Tour)
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);

        if (b == null)
        {
            return NotFound(new { message = $"Booking inquiry #{id} not found." });
        }

        var dto = new AdminBookingDetailDto
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
        };

        return Ok(dto);
    }

    /// <summary>
    /// Admin endpoint: updates booking status (Pending, Contacted, Confirmed, Paid, Cancelled).
    /// </summary>
    [HttpPut("{id}/status")]
    [HttpPatch("{id}/status")]
    [Authorize(Roles = "Administrator")]
    public async Task<ActionResult<AdminBookingDetailDto>> UpdateBookingStatus(int id, [FromBody] UpdateBookingStatusDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Status))
        {
            return BadRequest(new { message = "Status is required." });
        }

        var validStatuses = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            "Pending", "Contacted", "Confirmed", "Paid", "Cancelled"
        };

        var normalizedStatus = char.ToUpper(dto.Status[0]) + dto.Status[1..].ToLower();
        if (!validStatuses.Contains(dto.Status.Trim()))
        {
            return BadRequest(new { message = $"Invalid status '{dto.Status}'. Allowed values: Pending, Contacted, Confirmed, Paid, Cancelled." });
        }

        var booking = await _context.BookingInquiries
            .Include(b => b.Tour)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (booking == null)
        {
            return NotFound(new { message = $"Booking inquiry #{id} not found." });
        }

        booking.Status = normalizedStatus;
        if (!string.IsNullOrWhiteSpace(dto.Notes))
        {
            booking.SpecialRequests = string.IsNullOrWhiteSpace(booking.SpecialRequests) 
                ? $"[Concierge Note: {dto.Notes}]" 
                : $"{booking.SpecialRequests}\n[Concierge Note: {dto.Notes}]";
        }

        await _context.SaveChangesAsync();

        return Ok(new AdminBookingDetailDto
        {
            Id = booking.Id,
            TourId = booking.TourId,
            TourTitle = booking.Tour != null ? booking.Tour.TitleEn : "Bespoke Journey",
            TourSlug = booking.Tour != null ? booking.Tour.Slug : string.Empty,
            TourMainImageUrl = booking.Tour != null ? booking.Tour.MainImageUrl : string.Empty,
            FullName = booking.FullName,
            Email = booking.Email,
            Phone = booking.Phone,
            Country = booking.Country,
            NumberOfGuests = booking.NumberOfGuests,
            TravelDate = booking.TravelDate,
            TrainPreference = booking.TrainPreference,
            SpecialRequests = booking.SpecialRequests,
            PreferredLanguage = booking.PreferredLanguage,
            EstimatedTotalUsd = booking.EstimatedTotalUsd,
            EstimatedTotalPen = booking.EstimatedTotalPen,
            Status = booking.Status,
            CreatedAt = booking.CreatedAt,
            WhatsAppUrl = BuildGuestWhatsAppUrl(booking.Phone, booking.FullName, booking.Tour != null ? booking.Tour.TitleEn : "Bespoke Journey")
        });
    }

    /// <summary>
    /// Admin endpoint: updates full booking details.
    /// </summary>
    [HttpPut("{id}")]
    [Authorize(Roles = "Administrator")]
    public async Task<ActionResult<AdminBookingDetailDto>> UpdateBooking(int id, [FromBody] UpdateBookingDto dto)
    {
        var booking = await _context.BookingInquiries
            .Include(b => b.Tour)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (booking == null)
        {
            return NotFound(new { message = $"Booking inquiry #{id} not found." });
        }

        if (!string.IsNullOrWhiteSpace(dto.FullName)) booking.FullName = dto.FullName.Trim();
        if (!string.IsNullOrWhiteSpace(dto.Email)) booking.Email = dto.Email.Trim().ToLower();
        if (!string.IsNullOrWhiteSpace(dto.Phone)) booking.Phone = dto.Phone.Trim();
        if (dto.Country != null) booking.Country = dto.Country.Trim();
        if (dto.NumberOfGuests.HasValue && dto.NumberOfGuests.Value > 0) booking.NumberOfGuests = dto.NumberOfGuests.Value;
        if (dto.TravelDate.HasValue) booking.TravelDate = dto.TravelDate.Value;
        if (!string.IsNullOrWhiteSpace(dto.TrainPreference)) booking.TrainPreference = dto.TrainPreference.Trim();
        if (dto.SpecialRequests != null) booking.SpecialRequests = dto.SpecialRequests.Trim();
        if (!string.IsNullOrWhiteSpace(dto.Status)) booking.Status = dto.Status.Trim();
        if (dto.EstimatedTotalUsd.HasValue) booking.EstimatedTotalUsd = dto.EstimatedTotalUsd.Value;
        if (dto.EstimatedTotalPen.HasValue) booking.EstimatedTotalPen = dto.EstimatedTotalPen.Value;

        await _context.SaveChangesAsync();

        return Ok(new AdminBookingDetailDto
        {
            Id = booking.Id,
            TourId = booking.TourId,
            TourTitle = booking.Tour != null ? booking.Tour.TitleEn : "Bespoke Journey",
            TourSlug = booking.Tour != null ? booking.Tour.Slug : string.Empty,
            TourMainImageUrl = booking.Tour != null ? booking.Tour.MainImageUrl : string.Empty,
            FullName = booking.FullName,
            Email = booking.Email,
            Phone = booking.Phone,
            Country = booking.Country,
            NumberOfGuests = booking.NumberOfGuests,
            TravelDate = booking.TravelDate,
            TrainPreference = booking.TrainPreference,
            SpecialRequests = booking.SpecialRequests,
            PreferredLanguage = booking.PreferredLanguage,
            EstimatedTotalUsd = booking.EstimatedTotalUsd,
            EstimatedTotalPen = booking.EstimatedTotalPen,
            Status = booking.Status,
            CreatedAt = booking.CreatedAt,
            WhatsAppUrl = BuildGuestWhatsAppUrl(booking.Phone, booking.FullName, booking.Tour != null ? booking.Tour.TitleEn : "Bespoke Journey")
        });
    }

    /// <summary>
    /// Admin endpoint: deletes a booking inquiry.
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> DeleteBooking(int id)
    {
        var booking = await _context.BookingInquiries.FindAsync(id);
        if (booking == null)
        {
            return NotFound(new { message = $"Booking inquiry #{id} not found." });
        }

        _context.BookingInquiries.Remove(booking);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = $"Booking inquiry #{id} removed successfully." });
    }

    private static string BuildGuestWhatsAppUrl(string phone, string guestName, string tourTitle)
    {
        var cleanPhone = new string(phone.Where(char.IsDigit).ToArray());
        if (string.IsNullOrWhiteSpace(cleanPhone)) return string.Empty;

        var message = $"Dear {guestName}, greeting from Luxury Machupicchu Peru Concierge regarding your inquiry for {tourTitle}.";
        return $"https://wa.me/{cleanPhone}?text={WebUtility.UrlEncode(message)}";
    }
}
