using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LuxuryMachupicchu.API.DTOs;
using LuxuryMachupicchu.Domain.Entities;
using LuxuryMachupicchu.Infrastructure.Data;

namespace LuxuryMachupicchu.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestimonialsController : ControllerBase
{
    private readonly LuxuryMachupicchuDbContext _context;

    public TestimonialsController(LuxuryMachupicchuDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Public endpoint: retrieves verified guest reviews.
    /// </summary>
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult<IEnumerable<TestimonialDto>>> GetVerified([FromQuery] string lang = "en")
    {
        var isEs = string.Equals(lang, "es", StringComparison.OrdinalIgnoreCase);

        var list = await _context.Testimonials
            .AsNoTracking()
            .Where(t => t.IsVerified)
            .OrderByDescending(t => t.Date)
            .Select(t => new TestimonialDto
            {
                Id = t.Id,
                GuestName = t.GuestName,
                OriginCountry = t.OriginCountry,
                Rating = t.Rating,
                CommentEn = t.CommentEn,
                CommentEs = t.CommentEs,
                JourneyName = t.JourneyName,
                Date = t.Date,
                IsVerified = t.IsVerified
            })
            .ToListAsync();

        return Ok(list);
    }

    /// <summary>
    /// Admin endpoint: retrieves all testimonials.
    /// </summary>
    [HttpGet("admin/all")]
    [Authorize(Roles = "Administrator")]
    public async Task<ActionResult<IEnumerable<TestimonialDto>>> GetAllAdmin()
    {
        var list = await _context.Testimonials
            .AsNoTracking()
            .OrderByDescending(t => t.Date)
            .Select(t => new TestimonialDto
            {
                Id = t.Id,
                GuestName = t.GuestName,
                OriginCountry = t.OriginCountry,
                Rating = t.Rating,
                CommentEn = t.CommentEn,
                CommentEs = t.CommentEs,
                JourneyName = t.JourneyName,
                Date = t.Date,
                IsVerified = t.IsVerified
            })
            .ToListAsync();

        return Ok(list);
    }

    /// <summary>
    /// Admin endpoint: creates a new testimonial.
    /// </summary>
    [HttpPost]
    [Authorize(Roles = "Administrator")]
    public async Task<ActionResult<TestimonialDto>> Create([FromBody] CreateTestimonialDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);

        var test = new Testimonial
        {
            GuestName = dto.GuestName.Trim(),
            OriginCountry = dto.OriginCountry.Trim(),
            Rating = Math.Clamp(dto.Rating, 1, 5),
            CommentEn = dto.CommentEn.Trim(),
            CommentEs = dto.CommentEs.Trim(),
            JourneyName = dto.JourneyName.Trim(),
            Date = DateTime.UtcNow,
            IsVerified = dto.IsVerified
        };

        await _context.Testimonials.AddAsync(test);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetVerified), new { id = test.Id }, new TestimonialDto
        {
            Id = test.Id,
            GuestName = test.GuestName,
            OriginCountry = test.OriginCountry,
            Rating = test.Rating,
            CommentEn = test.CommentEn,
            CommentEs = test.CommentEs,
            JourneyName = test.JourneyName,
            Date = test.Date,
            IsVerified = test.IsVerified
        });
    }

    /// <summary>
    /// Admin endpoint: updates an existing testimonial.
    /// </summary>
    [HttpPut("{id}")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> Update(int id, [FromBody] CreateTestimonialDto dto)
    {
        var test = await _context.Testimonials.FindAsync(id);
        if (test == null) return NotFound(new { message = $"Testimonial #{id} not found." });

        test.GuestName = dto.GuestName.Trim();
        test.OriginCountry = dto.OriginCountry.Trim();
        test.Rating = Math.Clamp(dto.Rating, 1, 5);
        test.CommentEn = dto.CommentEn.Trim();
        test.CommentEs = dto.CommentEs.Trim();
        test.JourneyName = dto.JourneyName.Trim();
        test.IsVerified = dto.IsVerified;

        await _context.SaveChangesAsync();
        return Ok(new { success = true, id = test.Id, message = "Testimonial updated." });
    }

    /// <summary>
    /// Admin endpoint: toggles verified status.
    /// </summary>
    [HttpPatch("{id}/toggle-verify")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> ToggleVerify(int id)
    {
        var test = await _context.Testimonials.FindAsync(id);
        if (test == null) return NotFound(new { message = $"Testimonial #{id} not found." });

        test.IsVerified = !test.IsVerified;
        await _context.SaveChangesAsync();

        return Ok(new { success = true, id = test.Id, isVerified = test.IsVerified });
    }

    /// <summary>
    /// Admin endpoint: deletes a testimonial.
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> Delete(int id)
    {
        var test = await _context.Testimonials.FindAsync(id);
        if (test == null) return NotFound(new { message = $"Testimonial #{id} not found." });

        _context.Testimonials.Remove(test);
        await _context.SaveChangesAsync();

        return Ok(new { success = true, message = $"Testimonial #{id} deleted." });
    }
}
