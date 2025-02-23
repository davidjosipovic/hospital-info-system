using System.ComponentModel.DataAnnotations;
public class Department
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required, StringLength(100)]
    public string? Name { get; set; }
}
