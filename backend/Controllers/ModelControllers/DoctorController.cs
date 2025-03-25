using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class DoctorsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DoctorsController(ApplicationDbContext context)
    {
        _context = context;
    }


    [HttpGet]
    public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
    {
        return await _context.Doctors
            .Include(d => d.User)
            .Include(d => d.Department)
            .Include(d => d.Specialization)
            .ToListAsync();
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Doctor>> GetDoctor(Guid id)
    {
        var doctor = await _context.Doctors
            .Include(d => d.User)
            .Include(d => d.Department)
            .Include(d => d.Specialization)
            .FirstOrDefaultAsync(d => d.Id == id);

        if (doctor == null)
        {
            return NotFound();
        }

        return doctor;
    }


    [HttpPost]
    public async Task<ActionResult<Doctor>> CreateDoctor(Doctor doctor)
    {
      
        if (!_context.Users.Any(u => u.Id == doctor.UserId))
        {
            return BadRequest("Invalid UserId.");
        }
        if (!_context.Departments.Any(dep => dep.Id == doctor.DepartmentId))
        {
            return BadRequest("Invalid DepartmentId.");
        }
        if (!_context.Specializations.Any(s => s.Id == doctor.SpecializationId))
        {
            return BadRequest("Invalid SpecializationId.");
        }

        _context.Doctors.Add(doctor);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetDoctor), new { id = doctor.Id }, doctor);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDoctor(Guid id, Doctor doctor)
    {
        if (id != doctor.Id)
        {
            return BadRequest();
        }


        if (!_context.Users.Any(u => u.Id == doctor.UserId))
        {
            return BadRequest("Invalid UserId.");
        }
        if (!_context.Departments.Any(dep => dep.Id == doctor.DepartmentId))
        {
            return BadRequest("Invalid DepartmentId.");
        }
        if (!_context.Specializations.Any(s => s.Id == doctor.SpecializationId))
        {
            return BadRequest("Invalid SpecializationId.");
        }

        _context.Entry(doctor).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Doctors.Any(d => d.Id == id))
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
    public async Task<IActionResult> DeleteDoctor(Guid id)
    {
        var doctor = await _context.Doctors.FindAsync(id);
        if (doctor == null)
        {
            return NotFound();
        }

        _context.Doctors.Remove(doctor);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
