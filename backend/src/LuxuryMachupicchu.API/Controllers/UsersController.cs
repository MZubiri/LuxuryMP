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
    /// Lists all system users with their assigned roles.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<UserDto>>> GetUsers()
    {
        var users = await _context.Users
            .AsNoTracking()
            .Include(u => u.AppRole)
            .OrderBy(u => u.Id)
            .Select(u => new UserDto
            {
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                FullName = u.FullName,
                Role = u.Role,
                RoleId = u.RoleId,
                RoleDisplayName = u.AppRole != null ? u.AppRole.DisplayName : u.Role,
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
        var user = await _context.Users
            .Include(u => u.AppRole)
            .FirstOrDefaultAsync(u => u.Id == id);

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
            RoleId = user.RoleId,
            RoleDisplayName = user.AppRole != null ? user.AppRole.DisplayName : user.Role,
            IsActive = user.IsActive,
            CreatedAt = user.CreatedAt,
            LastLoginAt = user.LastLoginAt
        });
    }

    /// <summary>
    /// Creates a new system user and assigns a role.
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

        // Resolve Role by RoleId or Role Name
        AppRole? role = null;
        if (dto.RoleId.HasValue && dto.RoleId.Value > 0)
        {
            role = await _context.Roles.FindAsync(dto.RoleId.Value);
        }

        if (role == null && !string.IsNullOrWhiteSpace(dto.Role))
        {
            role = await _context.Roles.FirstOrDefaultAsync(r => r.Name.ToLower() == dto.Role.Trim().ToLower());
        }

        // Fallback default
        if (role == null)
        {
            role = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "Editor")
                   ?? await _context.Roles.FirstOrDefaultAsync();
        }

        var roleName = role?.Name ?? (string.IsNullOrWhiteSpace(dto.Role) ? "Editor" : dto.Role.Trim());
        var roleDisplayName = role?.DisplayName ?? roleName;

        var user = new AppUser
        {
            Username = normalizedUser,
            Email = normalizedEmail,
            FullName = dto.FullName.Trim(),
            Role = roleName,
            RoleId = role?.Id,
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
            RoleId = user.RoleId,
            RoleDisplayName = roleDisplayName,
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
        var user = await _context.Users.Include(u => u.AppRole).FirstOrDefaultAsync(u => u.Id == id);
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

        // Role resolution
        if (dto.RoleId.HasValue && dto.RoleId.Value > 0)
        {
            var targetRole = await _context.Roles.FindAsync(dto.RoleId.Value);
            if (targetRole == null)
            {
                return BadRequest(new { message = $"El rol con ID #{dto.RoleId.Value} no existe." });
            }

            // Prevent demoting the master administrator if it's the only one
            if (user.Role == "Administrator" && targetRole.Name != "Administrator")
            {
                var adminCount = await _context.Users.CountAsync(u => u.Role == "Administrator" && u.IsActive);
                if (adminCount <= 1)
                {
                    return BadRequest(new { message = "No puede degradar al único Administrador activo del sistema." });
                }
            }

            user.RoleId = targetRole.Id;
            user.Role = targetRole.Name;
        }
        else if (!string.IsNullOrWhiteSpace(dto.Role))
        {
            var targetRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name.ToLower() == dto.Role.Trim().ToLower());
            var roleName = targetRole?.Name ?? dto.Role.Trim();

            // Prevent demoting the master administrator if it's the only one
            if (user.Role == "Administrator" && roleName != "Administrator")
            {
                var adminCount = await _context.Users.CountAsync(u => u.Role == "Administrator" && u.IsActive);
                if (adminCount <= 1)
                {
                    return BadRequest(new { message = "No puede degradar al único Administrador activo del sistema." });
                }
            }

            user.Role = roleName;
            user.RoleId = targetRole?.Id;
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

        var updatedRole = await _context.Roles.FindAsync(user.RoleId);

        return Ok(new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            FullName = user.FullName,
            Role = user.Role,
            RoleId = user.RoleId,
            RoleDisplayName = updatedRole?.DisplayName ?? user.Role,
            IsActive = user.IsActive,
            CreatedAt = user.CreatedAt,
            LastLoginAt = user.LastLoginAt
        });
    }

    /// <summary>
    /// Directly assigns a role to a user.
    /// </summary>
    [HttpPut("{id}/role")]
    public async Task<IActionResult> AssignRole(int id, [FromBody] AssignUserRoleDto dto)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound(new { message = $"Usuario #{id} no encontrado." });
        }

        var role = await _context.Roles.FindAsync(dto.RoleId);
        if (role == null)
        {
            return NotFound(new { message = $"Rol #{dto.RoleId} no encontrado." });
        }

        // Prevent demoting the master administrator if it's the only one
        if (user.Role == "Administrator" && role.Name != "Administrator")
        {
            var adminCount = await _context.Users.CountAsync(u => u.Role == "Administrator" && u.IsActive);
            if (adminCount <= 1)
            {
                return BadRequest(new { message = "No puede degradar al único Administrador activo del sistema." });
            }
        }

        user.RoleId = role.Id;
        user.Role = role.Name;

        await _context.SaveChangesAsync();
        _logger.LogInformation("Assigned role '{RoleName}' (#{RoleId}) to user #{UserId} ({Username})", role.Name, role.Id, user.Id, user.Username);

        return Ok(new
        {
            success = true,
            message = $"Rol '{role.DisplayName}' asignado correctamente al usuario {user.FullName}.",
            userId = user.Id,
            roleId = role.Id,
            roleName = role.Name,
            roleDisplayName = role.DisplayName
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
