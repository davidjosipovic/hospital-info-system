using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Nurse
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public string? UserId { get; set; } 
    [ForeignKey("UserId")]
    public User? User { get; set; } 

    [Required]
    public Guid DepartmentId { get; set; }
    public Department? Department { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
