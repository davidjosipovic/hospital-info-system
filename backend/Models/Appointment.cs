using System.ComponentModel.DataAnnotations;
public class Appointment
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
    public DateTime AppointmentDate { get; set; }

    public string? SymptomsDescription { get; set; }

    [Required, StringLength(20)]
    public string Status { get; set; } = "scheduled";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
