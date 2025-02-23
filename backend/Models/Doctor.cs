using System.ComponentModel.DataAnnotations;
public class Doctor
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid UserId { get; set; }
    public User? User { get; set; }

    [Required]
    public Guid DepartmentId { get; set; }
    public Department? Department { get; set; }

    [Required]
    public Guid SpecializationId { get; set; }
    public Specialization? Specialization { get; set; }

    [Required, StringLength(50)]
    public string? LicenseNumber { get; set; }

    public int YearsOfExperience { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
