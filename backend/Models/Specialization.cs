using System.ComponentModel.DataAnnotations;
public class Specialization
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required, StringLength(100)]
    public string? Name { get; set; }
}
