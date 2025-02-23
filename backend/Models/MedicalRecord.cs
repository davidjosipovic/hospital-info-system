using System.ComponentModel.DataAnnotations;
public class MedicalRecord
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid PatientId { get; set; }
    public Patient? Patient { get; set; }

    [Required]
    public Guid DoctorId { get; set; }
    public Doctor? Doctor { get; set; }

    [Required]
    public string? Diagnosis { get; set; }

    public string? Treatment { get; set; }

    [Required]
    public DateTime VisitDate { get; set; } = DateTime.UtcNow;
}
