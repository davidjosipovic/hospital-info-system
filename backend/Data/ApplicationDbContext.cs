using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
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
}
