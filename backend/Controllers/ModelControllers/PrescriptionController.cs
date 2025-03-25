using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class PrescriptionsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PrescriptionsController(ApplicationDbContext context)
    {
        _context = context;
    }


    [HttpGet]
    public async Task<ActionResult<IEnumerable<Prescription>>> GetPrescriptions()
    {
        return await _context.Prescriptions
            .Include(p => p.Patient)
            .Include(p => p.Doctor)
            .ToListAsync();
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Prescription>> GetPrescription(Guid id)
    {
        var prescription = await _context.Prescriptions
            .Include(p => p.Patient)
            .Include(p => p.Doctor)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (prescription == null)
        {
            return NotFound();
        }

        return prescription;
    }


    [HttpPost]
    public async Task<ActionResult<Prescription>> CreatePrescription(Prescription prescription)
    {
 
        if (!_context.Patients.Any(p => p.Id == prescription.PatientId))
        {
            return BadRequest("Invalid PatientId.");
        }

        if (!_context.Doctors.Any(d => d.Id == prescription.DoctorId))
        {
            return BadRequest("Invalid DoctorId.");
        }

        _context.Prescriptions.Add(prescription);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPrescription), new { id = prescription.Id }, prescription);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePrescription(Guid id, Prescription prescription)
    {
        if (id != prescription.Id)
        {
            return BadRequest();
        }


        if (!_context.Patients.Any(p => p.Id == prescription.PatientId))
        {
            return BadRequest("Invalid PatientId.");
        }

        if (!_context.Doctors.Any(d => d.Id == prescription.DoctorId))
        {
            return BadRequest("Invalid DoctorId.");
        }

        _context.Entry(prescription).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Prescriptions.Any(p => p.Id == id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePrescription(Guid id)
    {
        var prescription = await _context.Prescriptions.FindAsync(id);
        if (prescription == null)
        {
            return NotFound();
        }

        _context.Prescriptions.Remove(prescription);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
