using System.ComponentModel.DataAnnotations;
public class WorkSchedule
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid UserId { get; set; }
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
