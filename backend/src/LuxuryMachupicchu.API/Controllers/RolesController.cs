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
[Authorize(Roles = "Administrator")]
public class RolesController : ControllerBase
{
    private readonly LuxuryMachupicchuDbContext _context;
    private readonly ILogger<RolesController> _logger;

    public RolesController(LuxuryMachupicchuDbContext context, ILogger<RolesController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Lists all roles with their assigned user count.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<RoleDto>>> GetRoles()
    {
        var roles = await _context.Roles
            .AsNoTracking()
            .Include(r => r.Users)
            .OrderBy(r => r.Id)
            .Select(r => new RoleDto
            {
                Id = r.Id,
                Name = r.Name,
                DisplayName = r.DisplayName,
                Description = r.Description,
                Permissions = ParsePermissions(r.Permissions),
                IsSystemRole = r.IsSystemRole,
                UsersCount = r.Users.Count,
                CreatedAt = r.CreatedAt
            })
            .ToListAsync();

        return Ok(roles);
    }

    /// <summary>
    /// Gets a single role by ID.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<RoleDto>> GetRoleById(int id)
    {
        var role = await _context.Roles
            .AsNoTracking()
            .Include(r => r.Users)
            .FirstOrDefaultAsync(r => r.Id == id);

        if (role == null)
        {
            return NotFound(new { message = $"Rol #{id} no encontrado." });
        }

        return Ok(new RoleDto
        {
            Id = role.Id,
            Name = role.Name,
            DisplayName = role.DisplayName,
            Description = role.Description,
            Permissions = ParsePermissions(role.Permissions),
            IsSystemRole = role.IsSystemRole,
            UsersCount = role.Users.Count,
            CreatedAt = role.CreatedAt
        });
    }

    /// <summary>
    /// Creates a new custom role.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<RoleDto>> CreateRole([FromBody] CreateRoleDto dto)
    {
        var normalizedName = dto.Name.Trim();

        // Check uniqueness of role name
        var exists = await _context.Roles.AnyAsync(r => r.Name.ToLower() == normalizedName.ToLower());
        if (exists)
        {
            return Conflict(new { message = $"El identificador de rol '{normalizedName}' ya se encuentra registrado." });
        }

        var permissionsJson = JsonSerializer.Serialize(dto.Permissions ?? new List<string>());

        var role = new AppRole
        {
            Name = normalizedName,
            DisplayName = dto.DisplayName.Trim(),
            Description = dto.Description?.Trim() ?? string.Empty,
            Permissions = permissionsJson,
            IsSystemRole = false,
            CreatedAt = DateTime.UtcNow
        };

        await _context.Roles.AddAsync(role);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Role created #{Id} ({Name} - {DisplayName})", role.Id, role.Name, role.DisplayName);

        return CreatedAtAction(nameof(GetRoleById), new { id = role.Id }, new RoleDto
        {
            Id = role.Id,
            Name = role.Name,
            DisplayName = role.DisplayName,
            Description = role.Description,
            Permissions = dto.Permissions ?? new List<string>(),
            IsSystemRole = role.IsSystemRole,
            UsersCount = 0,
            CreatedAt = role.CreatedAt
        });
    }

    /// <summary>
    /// Updates an existing role's details, display name, description, or permissions.
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRole(int id, [FromBody] UpdateRoleDto dto)
    {
        var role = await _context.Roles.FindAsync(id);
        if (role == null)
        {
            return NotFound(new { message = $"Rol #{id} no encontrado." });
        }

        // If not a system role and new name is provided, validate uniqueness and update
        if (!string.IsNullOrWhiteSpace(dto.Name) && !dto.Name.Equals(role.Name, StringComparison.OrdinalIgnoreCase))
        {
            if (role.IsSystemRole)
            {
                return BadRequest(new { message = "No se puede alterar el identificador técnico de los roles protegidos del sistema." });
            }

            var trimmedName = dto.Name.Trim();
            var nameTaken = await _context.Roles.AnyAsync(r => r.Id != id && r.Name.ToLower() == trimmedName.ToLower());
            if (nameTaken)
            {
                return Conflict(new { message = $"El identificador de rol '{trimmedName}' ya está en uso." });
            }
            role.Name = trimmedName;
        }

        if (!string.IsNullOrWhiteSpace(dto.DisplayName))
        {
            role.DisplayName = dto.DisplayName.Trim();
        }

        if (dto.Description != null)
        {
            role.Description = dto.Description.Trim();
        }

        if (dto.Permissions != null)
        {
            role.Permissions = JsonSerializer.Serialize(dto.Permissions);
        }

        await _context.SaveChangesAsync();
        _logger.LogInformation("Role updated #{Id} ({Name})", role.Id, role.Name);

        var usersCount = await _context.Users.CountAsync(u => u.RoleId == id);

        return Ok(new RoleDto
        {
            Id = role.Id,
            Name = role.Name,
            DisplayName = role.DisplayName,
            Description = role.Description,
            Permissions = ParsePermissions(role.Permissions),
            IsSystemRole = role.IsSystemRole,
            UsersCount = usersCount,
            CreatedAt = role.CreatedAt
        });
    }

    /// <summary>
    /// Deletes a custom role if it's not a system role and has no assigned users.
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRole(int id)
    {
        var role = await _context.Roles
            .Include(r => r.Users)
            .FirstOrDefaultAsync(r => r.Id == id);

        if (role == null)
        {
            return NotFound(new { message = $"Rol #{id} no encontrado." });
        }

        if (role.IsSystemRole)
        {
            return BadRequest(new { message = $"El rol '{role.DisplayName}' es un rol nativo del sistema y no puede ser eliminado." });
        }

        if (role.Users.Any())
        {
            return BadRequest(new { message = $"No se puede eliminar el rol '{role.DisplayName}' porque tiene {role.Users.Count} usuario(s) asignado(s). Reasigne a los usuarios antes de eliminarlo." });
        }

        _context.Roles.Remove(role);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Role deleted #{Id} ({Name})", role.Id, role.Name);

        return Ok(new { success = true, message = $"Rol '{role.DisplayName}' eliminado exitosamente." });
    }

    private static List<string> ParsePermissions(string? json)
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
}
