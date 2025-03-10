using System.ComponentModel.DataAnnotations;
public class PatientRoomAssignment
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid PatientId { get; set; }
    public Patient? Patient { get; set; }

    [Required]
    public Guid RoomId { get; set; }
    public HospitalRoom? Room { get; set; }

    [Required]
    public DateTime AssignedDate { get; set; } = DateTime.UtcNow;

    public DateTime? ReleasedDate { get; set; } 
}
