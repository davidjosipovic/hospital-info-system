using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Nurse
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public string? UserId { get; set; } // ✅ Match IdentityUser<string> Id
    [ForeignKey("UserId")]
    public User? User { get; set; } // ✅ Explicitly define FK relationship

    [Required]
    public Guid DepartmentId { get; set; }
    public Department? Department { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
