using System.ComponentModel.DataAnnotations;
public class Patient
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required, StringLength(100)]
    public string? FirstName { get; set; }

    [Required, StringLength(100)]
    public string? LastName { get; set; }

    [Required]
    public DateTime DateOfBirth { get; set; }

    [Required]
    [StringLength(10)]
    public string? Gender { get; set; } 

    [StringLength(20)]
    public string? PhoneNumber { get; set; }

    [StringLength(255)]
    public string? Address { get; set; }

    [StringLength(255)]
    public string? EmergencyContact { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
