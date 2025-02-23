using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

public class User : IdentityUser
{
    [Required]
    [StringLength(100)]
    public string? FirstName { get; set; }

    [Required]
    [StringLength(100)]
    public string? LastName { get; set; }

    [Required]
    [StringLength(50)]
    [EnumDataType(typeof(UserRole))] // ✅ Enforces allowed roles
    public string? Role { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public enum UserRole
{
    Admin,
    Doctor,
    Nurse
}
