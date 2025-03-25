using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class MedicalRecordsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public MedicalRecordsController(ApplicationDbContext context)
    {
        _context = context;
    }


    [HttpGet]
    public async Task<ActionResult<IEnumerable<MedicalRecord>>> GetMedicalRecords()
    {
        return await _context.MedicalRecords
            .Include(m => m.Patient)
            .Include(m => m.Doctor)
            .ToListAsync();
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<MedicalRecord>> GetMedicalRecord(Guid id)
    {
        var medicalRecord = await _context.MedicalRecords
            .Include(m => m.Patient)
            .Include(m => m.Doctor)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (medicalRecord == null)
        {
            return NotFound();
        }

        return medicalRecord;
    }

 
    [HttpPost]
    public async Task<ActionResult<MedicalRecord>> CreateMedicalRecord(MedicalRecord medicalRecord)
    {

        if (!_context.Patients.Any(p => p.Id == medicalRecord.PatientId))
        {
            return BadRequest("Invalid PatientId.");
        }

        if (!_context.Doctors.Any(d => d.Id == medicalRecord.DoctorId))
        {
            return BadRequest("Invalid DoctorId.");
        }

        _context.MedicalRecords.Add(medicalRecord);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMedicalRecord), new { id = medicalRecord.Id }, medicalRecord);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateMedicalRecord(Guid id, MedicalRecord medicalRecord)
    {
        if (id != medicalRecord.Id)
        {
            return BadRequest();
        }

        if (!_context.Patients.Any(p => p.Id == medicalRecord.PatientId))
        {
            return BadRequest("Invalid PatientId.");
        }

        if (!_context.Doctors.Any(d => d.Id == medicalRecord.DoctorId))
        {
            return BadRequest("Invalid DoctorId.");
        }

        _context.Entry(medicalRecord).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.MedicalRecords.Any(m => m.Id == id))
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
    public async Task<IActionResult> DeleteMedicalRecord(Guid id)
    {
        var medicalRecord = await _context.MedicalRecords.FindAsync(id);
        if (medicalRecord == null)
        {
            return NotFound();
        }

        _context.MedicalRecords.Remove(medicalRecord);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
