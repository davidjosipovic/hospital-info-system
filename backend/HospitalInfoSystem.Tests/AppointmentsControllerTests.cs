using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FluentAssertions;
using Xunit;

public class AppointmentsControllerTests
{
    private readonly ApplicationDbContext _context;
    private readonly AppointmentsController _controller;

    public AppointmentsControllerTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb") 
            .Options;

        _context = new ApplicationDbContext(options);
        _controller = new AppointmentsController(_context);

      
        SeedDatabase();
    }

    private void SeedDatabase()
{
   
    var user = new User
    {
        Id = Guid.NewGuid().ToString(), 
        FirstName = "Dr. Smith",
        LastName = "Johnson",
        Role = UserRole.Doctor.ToString()
    };
    _context.Users.Add(user);

   
    var department = new Department { Id = Guid.NewGuid(), Name = "Cardiology" };
    var specialization = new Specialization { Id = Guid.NewGuid(), Name = "Heart Surgery" };
    _context.Departments.Add(department);
    _context.Specializations.Add(specialization);

    
    var doctor = new Doctor
    {
        Id = Guid.NewGuid(),
        UserId = user.Id, 
        DepartmentId = department.Id, 
        SpecializationId = specialization.Id,
        LicenseNumber = "DOC12345",
        YearsOfExperience = 10
    };
    _context.Doctors.Add(doctor);

    
    var patient = new Patient
    {
        Id = Guid.NewGuid(),
        FirstName = "John",
        LastName = "Doe",
        Gender = "Male" 
    };
    _context.Patients.Add(patient);

    _context.Appointments.Add(new Appointment
    {
        Id = Guid.NewGuid(),
        PatientId = patient.Id,
        DoctorId = doctor.Id,
        AppointmentDate = DateTime.UtcNow,
        Status = "scheduled"
    });

    _context.SaveChanges();
}

  
    [Fact]
    public async Task GetAppointments_ShouldReturnListOfAppointments()
    {
     
        var result = await _controller.GetAppointments();

        
        result.Value.Should().NotBeNull();
        result.Value.Should().HaveCount(1);
    }

 
    [Fact]
    public async Task GetAppointment_ShouldReturnAppointment_WhenExists()
    {
     
        var existingAppointment = await _context.Appointments.FirstAsync();

    
        var result = await _controller.GetAppointment(existingAppointment.Id);

     
        result.Value.Should().NotBeNull();
        result.Value!.Id.Should().Be(existingAppointment.Id);
    }

  
    [Fact]
    public async Task GetAppointment_ShouldReturnNotFound_WhenNotExists()
    {

        var result = await _controller.GetAppointment(Guid.NewGuid());

      
        result.Result.Should().BeOfType<NotFoundResult>();
    }


    [Fact]
    public async Task CreateAppointment_ShouldReturnCreated_WhenValid()
    {
      
        var validPatient = await _context.Patients.FirstAsync();
        var validDoctor = await _context.Doctors.FirstAsync();

        var newAppointment = new Appointment
        {
            Id = Guid.NewGuid(),
            PatientId = validPatient.Id,
            DoctorId = validDoctor.Id,
            AppointmentDate = DateTime.UtcNow.AddDays(2),
            Status = "scheduled"
        };

    
        var result = await _controller.CreateAppointment(newAppointment);

     
        result.Result.Should().BeOfType<CreatedAtActionResult>();
    }

   
    [Fact]
    public async Task CreateAppointment_ShouldReturnBadRequest_WhenInvalidPatient()
    {
    
        var validDoctor = await _context.Doctors.FirstAsync();

        var newAppointment = new Appointment
        {
            Id = Guid.NewGuid(),
            PatientId = Guid.NewGuid(), 
            DoctorId = validDoctor.Id,
            AppointmentDate = DateTime.UtcNow.AddDays(2),
            Status = "scheduled"
        };

      
        var result = await _controller.CreateAppointment(newAppointment);

      
        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }

    
    [Fact]
    public async Task UpdateAppointment_ShouldReturnNoContent_WhenSuccessful()
    {
     
        var existingAppointment = await _context.Appointments.FirstAsync();
        existingAppointment.Status = "completed";

       
        var result = await _controller.UpdateAppointment(existingAppointment.Id, existingAppointment);

    
        result.Should().BeOfType<NoContentResult>();
    }

    
    [Fact]
public async Task UpdateAppointment_ShouldReturnNotFound_WhenNotExists()
{
    
    var patient = new Patient { Id = Guid.NewGuid(), FirstName = "John", LastName = "Doe", Gender = "Male" };
    
    var doctor = new Doctor 
    { 
        Id = Guid.NewGuid(), 
        UserId = Guid.NewGuid().ToString(),
        LicenseNumber = "DOC99999", 
        DepartmentId = Guid.NewGuid(),
        SpecializationId = Guid.NewGuid(),
        YearsOfExperience = 5
    };

    _context.Patients.Add(patient);
    _context.Doctors.Add(doctor);
    await _context.SaveChangesAsync(); 

    var nonExistentAppointment = new Appointment
    {
        Id = Guid.NewGuid(),  
        PatientId = patient.Id, 
        DoctorId = doctor.Id,  
        AppointmentDate = DateTime.UtcNow,
        Status = "scheduled"
    };

 
    var result = await _controller.UpdateAppointment(nonExistentAppointment.Id, nonExistentAppointment);

 
    result.Should().BeOfType<NotFoundResult>(); 
}


    [Fact]
    public async Task DeleteAppointment_ShouldReturnNoContent_WhenSuccessful()
    {
   
        var existingAppointment = await _context.Appointments.FirstAsync();


        var result = await _controller.DeleteAppointment(existingAppointment.Id);

   
        result.Should().BeOfType<NoContentResult>();
    }

 
    [Fact]
    public async Task DeleteAppointment_ShouldReturnNotFound_WhenNotExists()
    {
   
        var result = await _controller.DeleteAppointment(Guid.NewGuid());

   
        result.Should().BeOfType<NotFoundResult>();
    }
}
