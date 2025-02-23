using System.ComponentModel.DataAnnotations;
public class HospitalRoom
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public int RoomNumber { get; set; } // Must be unique

    [Required]
    public int Capacity { get; set; } // Total beds in the room

    public int CurrentPatients { get; set; } = 0; // Defaults to 0
}
