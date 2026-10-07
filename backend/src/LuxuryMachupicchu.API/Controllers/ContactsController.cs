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
public class ContactsController : ControllerBase
{
    private readonly LuxuryMachupicchuDbContext _context;

    public ContactsController(LuxuryMachupicchuDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Public endpoint: guest submits general contact or concierge message.
    /// </summary>
    [HttpPost]
    [AllowAnonymous]
    [EnableRateLimiting("contact-policy")]
    public async Task<IActionResult> SubmitMessage([FromBody] CreateContactMessageDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var msg = new ContactMessage
        {
            Name = dto.Name.Trim(),
            Email = dto.Email.Trim().ToLower(),
            Phone = dto.Phone?.Trim() ?? string.Empty,
            Subject = dto.Subject.Trim(),
            Message = dto.Message.Trim(),
            CreatedAt = DateTime.UtcNow,
            IsRead = false
        };

        await _context.ContactMessages.AddAsync(msg);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            success = true,
            id = msg.Id,
            message = "Your message has been safely received by the Luxury Machupicchu Concierge team."
        });
    }

    /// <summary>
    /// Admin endpoint: lists incoming guest contact messages.
    /// </summary>
    [HttpGet]
    [Authorize(Roles = "Administrator")]
    public async Task<ActionResult<PaginatedResponse<ContactMessageDto>>> GetMessages(
        [FromQuery] bool? isRead,
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        page = Math.Max(1, page);
        pageSize = Math.Clamp(pageSize, 1, 100);

        var query = _context.ContactMessages.AsNoTracking().AsQueryable();

        if (isRead.HasValue)
        {
            query = query.Where(m => m.IsRead == isRead.Value);
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLower();
            query = query.Where(m => m.Name.ToLower().Contains(term) ||
                                     m.Email.ToLower().Contains(term) ||
                                     m.Phone.ToLower().Contains(term) ||
                                     m.Subject.ToLower().Contains(term) ||
                                     m.Message.ToLower().Contains(term));
        }

        var total = await query.CountAsync();

        var items = await query
            .OrderByDescending(m => m.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(m => new ContactMessageDto
            {
                Id = m.Id,
                Name = m.Name,
                Email = m.Email,
                Phone = m.Phone,
                Subject = m.Subject,
                Message = m.Message,
                CreatedAt = m.CreatedAt,
                IsRead = m.IsRead
            })
            .ToListAsync();

        return Ok(new PaginatedResponse<ContactMessageDto>
        {
            TotalItems = total,
            Page = page,
            PageSize = pageSize,
            Items = items
        });
    }

    /// <summary>
    /// Admin endpoint: retrieves a single contact message.
    /// </summary>
    [HttpGet("{id}")]
    [Authorize(Roles = "Administrator")]
    public async Task<ActionResult<ContactMessageDto>> GetMessage(int id)
    {
        var m = await _context.ContactMessages.FindAsync(id);
        if (m == null) return NotFound(new { message = $"Message #{id} not found." });

        return Ok(new ContactMessageDto
        {
            Id = m.Id,
            Name = m.Name,
            Email = m.Email,
            Phone = m.Phone,
            Subject = m.Subject,
            Message = m.Message,
            CreatedAt = m.CreatedAt,
            IsRead = m.IsRead
        });
    }

    /// <summary>
    /// Admin endpoint: updates read status of a message.
    /// </summary>
    [HttpPut("{id}/read")]
    [HttpPatch("{id}/read")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> SetReadStatus(int id, [FromBody] UpdateContactReadDto dto)
    {
        var msg = await _context.ContactMessages.FindAsync(id);
        if (msg == null) return NotFound(new { message = $"Message #{id} not found." });

        msg.IsRead = dto.IsRead;
        await _context.SaveChangesAsync();

        return Ok(new { success = true, id = msg.Id, isRead = msg.IsRead });
    }

    /// <summary>
    /// Admin endpoint: deletes a contact message.
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> DeleteMessage(int id)
    {
        var msg = await _context.ContactMessages.FindAsync(id);
        if (msg == null) return NotFound(new { message = $"Message #{id} not found." });

        _context.ContactMessages.Remove(msg);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = $"Message #{id} deleted." });
    }
}
