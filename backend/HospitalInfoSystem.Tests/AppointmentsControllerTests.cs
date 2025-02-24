using Xunit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;

public class AppointmentsControllerTests
{
    private readonly ApplicationDbContext _context;
    private readonly AppointmentsController _controller;

    public AppointmentsControllerTests()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb") // ✅ In-memory database
            .Options;

        _context = new ApplicationDbContext(options);
        _controller = new AppointmentsController(_context);

        // Seed Data
        SeedDatabase();
    }

    private void SeedDatabase()
{
    // Create User for Doctor
    var user = new User
    {
        Id = Guid.NewGuid().ToString(), // ✅ Convert Guid to string (IdentityUser<string>)
        FirstName = "Dr. Smith",
        LastName = "Johnson",
        Role = UserRole.Doctor.ToString()
    };
    _context.Users.Add(user);

    // Create Required Department and Specialization
    var department = new Department { Id = Guid.NewGuid(), Name = "Cardiology" };
    var specialization = new Specialization { Id = Guid.NewGuid(), Name = "Heart Surgery" };
    _context.Departments.Add(department);
    _context.Specializations.Add(specialization);

    // Create Doctor with User, Department, and Specialization
    var doctor = new Doctor
    {
        Id = Guid.NewGuid(),
        UserId = user.Id, // ✅ Set FK
        DepartmentId = department.Id, // ✅ Set FK
        SpecializationId = specialization.Id, // ✅ Set FK
        LicenseNumber = "DOC12345",
        YearsOfExperience = 10
    };
    _context.Doctors.Add(doctor);

    // Create Patient
    var patient = new Patient
    {
        Id = Guid.NewGuid(),
        FirstName = "John",
        LastName = "Doe",
        Gender = "Male" // ✅ Ensure required property is set
    };
    _context.Patients.Add(patient);

    // Create Appointment
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

    // ✅ TEST: Get all appointments
    [Fact]
    public async Task GetAppointments_ShouldReturnListOfAppointments()
    {
        // Act
        var result = await _controller.GetAppointments();

        // Assert
        result.Value.Should().NotBeNull();
        result.Value.Should().HaveCount(1);
    }

    // ✅ TEST: Get appointment by ID (Valid)
    [Fact]
    public async Task GetAppointment_ShouldReturnAppointment_WhenExists()
    {
        // Arrange
        var existingAppointment = await _context.Appointments.FirstAsync();

        // Act
        var result = await _controller.GetAppointment(existingAppointment.Id);

        // Assert
        result.Value.Should().NotBeNull();
        result.Value!.Id.Should().Be(existingAppointment.Id);
    }

    // ❌ TEST: Get appointment by ID (Not Found)
    [Fact]
    public async Task GetAppointment_ShouldReturnNotFound_WhenNotExists()
    {
        // Act
        var result = await _controller.GetAppointment(Guid.NewGuid());

        // Assert
        result.Result.Should().BeOfType<NotFoundResult>();
    }

    // ✅ TEST: Create Appointment (Valid)
    [Fact]
    public async Task CreateAppointment_ShouldReturnCreated_WhenValid()
    {
        // Arrange
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

        // Act
        var result = await _controller.CreateAppointment(newAppointment);

        // Assert
        result.Result.Should().BeOfType<CreatedAtActionResult>();
    }

    // ❌ TEST: Create Appointment (Invalid PatientId)
    [Fact]
    public async Task CreateAppointment_ShouldReturnBadRequest_WhenInvalidPatient()
    {
        // Arrange
        var validDoctor = await _context.Doctors.FirstAsync();

        var newAppointment = new Appointment
        {
            Id = Guid.NewGuid(),
            PatientId = Guid.NewGuid(), // ❌ Invalid Patient
            DoctorId = validDoctor.Id,
            AppointmentDate = DateTime.UtcNow.AddDays(2),
            Status = "scheduled"
        };

        // Act
        var result = await _controller.CreateAppointment(newAppointment);

        // Assert
        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }

    // ✅ TEST: Update Appointment (Valid)
    [Fact]
    public async Task UpdateAppointment_ShouldReturnNoContent_WhenSuccessful()
    {
        // Arrange
        var existingAppointment = await _context.Appointments.FirstAsync();
        existingAppointment.Status = "completed";

        // Act
        var result = await _controller.UpdateAppointment(existingAppointment.Id, existingAppointment);

        // Assert
        result.Should().BeOfType<NoContentResult>();
    }

    // ❌ TEST: Update Appointment (Not Found)
    [Fact]
public async Task UpdateAppointment_ShouldReturnNotFound_WhenNotExists()
{
    // Arrange - Ensure no appointment exists
    var patient = new Patient { Id = Guid.NewGuid(), FirstName = "John", LastName = "Doe", Gender = "Male" };
    
    var doctor = new Doctor 
    { 
        Id = Guid.NewGuid(), 
        UserId = Guid.NewGuid().ToString(),
        LicenseNumber = "DOC99999", // ✅ Ensure LicenseNumber is set
        DepartmentId = Guid.NewGuid(), // Dummy department
        SpecializationId = Guid.NewGuid(), // Dummy specialization
        YearsOfExperience = 5
    };

    _context.Patients.Add(patient);
    _context.Doctors.Add(doctor);
    await _context.SaveChangesAsync(); // Save them so they're in DB

    var nonExistentAppointment = new Appointment
    {
        Id = Guid.NewGuid(),  // New ID that does NOT exist
        PatientId = patient.Id, // Use existing patient
        DoctorId = doctor.Id,   // Use existing doctor
        AppointmentDate = DateTime.UtcNow,
        Status = "scheduled"
    };

    // Act
    var result = await _controller.UpdateAppointment(nonExistentAppointment.Id, nonExistentAppointment);

    // Assert
    result.Should().BeOfType<NotFoundResult>(); // ✅ Expecting NotFound
}

    // ✅ TEST: Delete Appointment (Valid)
    [Fact]
    public async Task DeleteAppointment_ShouldReturnNoContent_WhenSuccessful()
    {
        // Arrange
        var existingAppointment = await _context.Appointments.FirstAsync();

        // Act
        var result = await _controller.DeleteAppointment(existingAppointment.Id);

        // Assert
        result.Should().BeOfType<NoContentResult>();
    }

    // ❌ TEST: Delete Appointment (Not Found)
    [Fact]
    public async Task DeleteAppointment_ShouldReturnNotFound_WhenNotExists()
    {
        // Act
        var result = await _controller.DeleteAppointment(Guid.NewGuid());

        // Assert
        result.Should().BeOfType<NotFoundResult>();
    }
}
