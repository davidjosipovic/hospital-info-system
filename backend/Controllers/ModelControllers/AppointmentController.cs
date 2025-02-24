using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class AppointmentsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AppointmentsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/appointments
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
    {
        return await _context.Appointments
            .Include(a => a.Patient)
            .Include(a => a.Doctor)
            .ToListAsync();
    }

    // GET: api/appointments/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Appointment>> GetAppointment(Guid id)
    {
        var appointment = await _context.Appointments
            .Include(a => a.Patient)
            .Include(a => a.Doctor)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (appointment == null)
        {
            return NotFound();
        }

        return appointment;
    }

    // POST: api/appointments
    [HttpPost]
    public async Task<ActionResult<Appointment>> CreateAppointment(Appointment appointment)
    {
        if (!_context.Patients.Any(p => p.Id == appointment.PatientId))
        {
            return BadRequest("Invalid PatientId.");
        }

        if (!_context.Doctors.Any(d => d.Id == appointment.DoctorId))
        {
            return BadRequest("Invalid DoctorId.");
        }

        _context.Appointments.Add(appointment);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAppointment), new { id = appointment.Id }, appointment);
    }

   [HttpPut("{id}")]
public async Task<IActionResult> UpdateAppointment(Guid id, Appointment appointment)
{
    if (id != appointment.Id)
    {
        return BadRequest();
    }

    var existingAppointment = await _context.Appointments.FindAsync(id);
    if (existingAppointment == null)
    {
        return NotFound(); // ✅ Return NotFound if the appointment does not exist
    }

    // ✅ Return NotFound instead of BadRequest for missing patient/doctor
    var patientExists = await _context.Patients.AnyAsync(p => p.Id == appointment.PatientId);
    if (!patientExists)
    {
        return NotFound("Patient not found.");
    }

    var doctorExists = await _context.Doctors.AnyAsync(d => d.Id == appointment.DoctorId);
    if (!doctorExists)
    {
        return NotFound("Doctor not found.");
    }

    existingAppointment.PatientId = appointment.PatientId;
    existingAppointment.DoctorId = appointment.DoctorId;
    existingAppointment.AppointmentDate = appointment.AppointmentDate;
    existingAppointment.Status = appointment.Status;

    _context.Entry(existingAppointment).State = EntityState.Modified;

    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
        return Conflict("Concurrency issue occurred while updating the appointment.");
    }

    return NoContent();
}



    // DELETE: api/appointments/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAppointment(Guid id)
    {
        var appointment = await _context.Appointments.FindAsync(id);
        if (appointment == null)
        {
            return NotFound();
        }

        _context.Appointments.Remove(appointment);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
