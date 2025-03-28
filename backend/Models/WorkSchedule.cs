using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class WorkSchedule
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public string? UserId { get; set; } 
    [ForeignKey("UserId")]
    public User? User { get; set; } 

    [Required]
    public DateTime WorkDate { get; set; }

    [Required]
    public TimeSpan StartTime { get; set; }

    [Required]
    public TimeSpan EndTime { get; set; }

    [Required, StringLength(20)]
    public string Status { get; set; } = "working";

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
