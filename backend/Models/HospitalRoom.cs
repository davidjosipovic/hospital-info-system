using System.ComponentModel.DataAnnotations;
public class HospitalRoom
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public int RoomNumber { get; set; } 

    [Required]
    public int Capacity { get; set; } 

    public int CurrentPatients { get; set; } = 0; 
}
