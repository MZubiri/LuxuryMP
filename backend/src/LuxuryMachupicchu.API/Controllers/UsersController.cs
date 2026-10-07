using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LuxuryMachupicchu.API.DTOs;
using LuxuryMachupicchu.Domain.Entities;
using LuxuryMachupicchu.Infrastructure.Data;
using LuxuryMachupicchu.Infrastructure.Security;

namespace LuxuryMachupicchu.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Administrator")]
public class UsersController : ControllerBase
{
    private readonly LuxuryMachupicchuDbContext _context;
    private readonly ILogger<UsersController> _logger;

    public UsersController(LuxuryMachupicchuDbContext context, ILogger<UsersController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Lists all system users (Administrator & Editor).
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<UserDto>>> GetUsers()
    {
        var users = await _context.Users
            .AsNoTracking()
            .OrderBy(u => u.Id)
            .Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                FullName = u.FullName,
                Role = u.Role,
                IsActive = u.IsActive,
                CreatedAt = u.CreatedAt,
                LastLoginAt = u.LastLoginAt
            })
            .ToListAsync();

        return Ok(users);
    }

    /// <summary>
    /// Gets single user details by ID.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUserById(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound(new { message = $"Usuario #{id} no encontrado." });
        }

        return Ok(new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            FullName = user.FullName,
            Role = user.Role,
            IsActive = user.IsActive,
            CreatedAt = user.CreatedAt,
            LastLoginAt = user.LastLoginAt
        });
    }

    /// <summary>
    /// Creates a new system user with Administrator or Editor role.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<UserDto>> CreateUser([FromBody] CreateUserDto dto)
    {
        var normalizedUser = dto.Username.Trim();
        var normalizedEmail = dto.Email.Trim().ToLowerInvariant();

        // Validate uniqueness
        var exists = await _context.Users.AnyAsync(u =>
            u.Username.ToLower() == normalizedUser.ToLower() ||
            u.Email.ToLower() == normalizedEmail);

        if (exists)
        {
            return Conflict(new { message = "El nombre de usuario o correo electrónico ya se encuentra registrado." });
        }

        var normalizedRole = dto.Role.Equals("Administrator", StringComparison.OrdinalIgnoreCase)
            ? "Administrator"
            : "Editor";

        var user = new AppUser
        {
            Username = normalizedUser,
            Email = normalizedEmail,
            FullName = dto.FullName.Trim(),
            Role = normalizedRole,
            PasswordHash = PasswordHasher.HashPassword(dto.Password),
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();

        _logger.LogInformation("New user created #{Id} ({Username}) with role {Role}", user.Id, user.Username, user.Role);

        return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            FullName = user.FullName,
            Role = user.Role,
            IsActive = user.IsActive,
            CreatedAt = user.CreatedAt,
            LastLoginAt = user.LastLoginAt
        });
    }

    /// <summary>
    /// Updates user profile, role, status or password.
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto dto)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound(new { message = $"Usuario #{id} no encontrado." });
        }

        if (!string.IsNullOrWhiteSpace(dto.Username))
        {
            var newUsername = dto.Username.Trim();
            var usernameTaken = await _context.Users.AnyAsync(u => u.Id != id && u.Username.ToLower() == newUsername.ToLower());
            if (usernameTaken)
            {
                return Conflict(new { message = "El nombre de usuario ya está en uso por otra cuenta." });
            }
            user.Username = newUsername;
        }

        if (!string.IsNullOrWhiteSpace(dto.Email))
        {
            var newEmail = dto.Email.Trim().ToLowerInvariant();
            var emailTaken = await _context.Users.AnyAsync(u => u.Id != id && u.Email.ToLower() == newEmail);
            if (emailTaken)
            {
                return Conflict(new { message = "El correo electrónico ya está en uso por otra cuenta." });
            }
            user.Email = newEmail;
        }

        if (!string.IsNullOrWhiteSpace(dto.FullName))
        {
            user.FullName = dto.FullName.Trim();
        }

        if (!string.IsNullOrWhiteSpace(dto.Role))
        {
            var targetRole = dto.Role.Equals("Administrator", StringComparison.OrdinalIgnoreCase)
                ? "Administrator"
                : "Editor";

            // Prevent demoting the master administrator if it's the only one
            if (user.Role == "Administrator" && targetRole == "Editor")
            {
                var adminCount = await _context.Users.CountAsync(u => u.Role == "Administrator" && u.IsActive);
                if (adminCount <= 1)
                {
                    return BadRequest(new { message = "No puede degradar al único Administrador activo del sistema." });
                }
            }

            user.Role = targetRole;
        }

        if (dto.IsActive.HasValue)
        {
            // Prevent disabling oneself
            var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (dto.IsActive.Value == false && (user.Username.Equals(currentUserId, StringComparison.OrdinalIgnoreCase) || user.Email.Equals(currentUserId, StringComparison.OrdinalIgnoreCase)))
            {
                return BadRequest(new { message = "No puede desactivar su propia cuenta de usuario en sesión." });
            }

            user.IsActive = dto.IsActive.Value;
        }

        if (!string.IsNullOrWhiteSpace(dto.Password))
        {
            user.PasswordHash = PasswordHasher.HashPassword(dto.Password.Trim());
        }

        await _context.SaveChangesAsync();
        _logger.LogInformation("User #{Id} ({Username}) updated successfully", user.Id, user.Username);

        return Ok(new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            FullName = user.FullName,
            Role = user.Role,
            IsActive = user.IsActive,
            CreatedAt = user.CreatedAt,
            LastLoginAt = user.LastLoginAt
        });
    }

    /// <summary>
    /// Deletes a user account.
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound(new { message = $"Usuario #{id} no encontrado." });
        }

        // Protect master concierge account
        if (user.Username.Equals("concierge@luxurymachupicchu.com", StringComparison.OrdinalIgnoreCase) ||
            user.Email.Equals("concierge@luxurymachupicchu.com", StringComparison.OrdinalIgnoreCase))
        {
            return BadRequest(new { message = "La cuenta maestra de Concierge no puede ser eliminada." });
        }

        // Prevent self deletion
        var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (user.Username.Equals(currentUserId, StringComparison.OrdinalIgnoreCase) ||
            user.Email.Equals(currentUserId, StringComparison.OrdinalIgnoreCase))
        {
            return BadRequest(new { message = "No puede eliminar su propia cuenta activa." });
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        _logger.LogInformation("User #{Id} ({Username}) deleted by Administrator", user.Id, user.Username);

        return Ok(new { success = true, message = $"Usuario #{id} ({user.FullName}) eliminado exitosamente." });
    }
}
