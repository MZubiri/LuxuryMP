using System.ComponentModel.DataAnnotations;

namespace LuxuryMachupicchu.API.DTOs;

public class RoleDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string> Permissions { get; set; } = new();
    public bool IsSystemRole { get; set; }
    public int UsersCount { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateRoleDto
{
    [Required]
    [MaxLength(60)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(120)]
    public string DisplayName { get; set; } = string.Empty;

    [MaxLength(300)]
    public string? Description { get; set; }

    public List<string> Permissions { get; set; } = new();
}

public class UpdateRoleDto
{
    [MaxLength(60)]
    public string? Name { get; set; }

    [Required]
    [MaxLength(120)]
    public string DisplayName { get; set; } = string.Empty;

    [MaxLength(300)]
    public string? Description { get; set; }

    public List<string> Permissions { get; set; } = new();
}

public class AssignUserRoleDto
{
    [Required]
    public int RoleId { get; set; }
}
