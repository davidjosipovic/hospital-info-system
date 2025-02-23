using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
public class ApplicationDbContext : IdentityDbContext<User>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Patient> Patients { get; set; }
    public DbSet<Department> Departments { get; set; }
    public DbSet<Doctor> Doctors { get; set; }
    public DbSet<Nurse> Nurses { get; set; }
    
    public DbSet<Specialization> Specializations  { get; set; }
    
    public DbSet<WorkSchedule> WorkSchedules { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<MedicalRecord> MedicalRecords  { get; set; }
    public DbSet<Prescription> Prescriptions  { get; set; }
    public DbSet<HospitalRoom> HospitalRooms { get; set; }
    public DbSet<PatientRoomAssignment> PatientRoomAssignments { get; set; }


     protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    // ✅ Explicitly define foreign key relationships
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
