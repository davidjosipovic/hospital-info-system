using System.ComponentModel.DataAnnotations;
public class Prescription
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid PatientId { get; set; }
    public Patient? Patient { get; set; }

    [Required]
    public Guid DoctorId { get; set; }
    public Doctor? Doctor { get; set; }

    [Required, StringLength(255)]
    public string? MedicineName { get; set; }

    [Required, StringLength(100)]
    public string? Dosage { get; set; }

    public string? Instructions { get; set; }

    public DateTime PrescribedAt { get; set; } = DateTime.UtcNow;
}
