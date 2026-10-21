using System.ComponentModel.DataAnnotations;

namespace LuxuryMachupicchu.API.DTOs;

public class UserDto
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Role { get; set; } = "Editor";
    public int? RoleId { get; set; }
    public string? RoleDisplayName { get; set; }
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
}

public class CreateUserDto
{
    [Required]
    [MaxLength(100)]
    public string Username { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(150)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MaxLength(150)]
    public string FullName { get; set; } = string.Empty;

    public string? Role { get; set; } // Role name
    public int? RoleId { get; set; } // Role ID from roles table

    [Required]
    [MinLength(6)]
    public string Password { get; set; } = string.Empty;
}

public class UpdateUserDto
{
    [MaxLength(100)]
    public string? Username { get; set; }

    [EmailAddress]
    [MaxLength(150)]
    public string? Email { get; set; }

    [MaxLength(150)]
    public string? FullName { get; set; }

    public string? Role { get; set; }
    public int? RoleId { get; set; }

    public bool? IsActive { get; set; }

    [MinLength(6)]
    public string? Password { get; set; } // Optional: only if updating password
}
