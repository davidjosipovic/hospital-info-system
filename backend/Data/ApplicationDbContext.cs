using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
public class ApplicationDbContext : IdentityDbContext<User>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Patient> Patients { get; set; } = default!;
    public DbSet<Department> Departments { get; set; } = default!;
    public DbSet<Doctor> Doctors { get; set; } = default!;
    public DbSet<Nurse> Nurses { get; set; } = default!;

    public DbSet<Specialization> Specializations { get; set; } = default!;

    public DbSet<WorkSchedule> WorkSchedules { get; set; } = default!;
    public DbSet<Appointment> Appointments { get; set; } = default!;
    public DbSet<MedicalRecord> MedicalRecords { get; set; } = default!;
    public DbSet<Prescription> Prescriptions { get; set; } = default!;
    public DbSet<HospitalRoom> HospitalRooms { get; set; } = default!;
    public DbSet<PatientRoomAssignment> PatientRoomAssignments { get; set; } = default!;


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Doctor>()
            .HasOne(d => d.User)
            .WithMany()
            .HasForeignKey(d => d.UserId);

        modelBuilder.Entity<Nurse>()
            .HasOne(n => n.User)
            .WithMany()
            .HasForeignKey(n => n.UserId);

        modelBuilder.Entity<WorkSchedule>()
            .HasOne(w => w.User)
            .WithMany()
            .HasForeignKey(w => w.UserId);
    }

}
