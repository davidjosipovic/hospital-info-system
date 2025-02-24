using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class NursesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public NursesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/nurses
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Nurse>>> GetNurses()
    {
        return await _context.Nurses
            .Include(n => n.User)
            .Include(n => n.Department)
            .ToListAsync();
    }

    // GET: api/nurses/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Nurse>> GetNurse(Guid id)
    {
        var nurse = await _context.Nurses
            .Include(n => n.User)
            .Include(n => n.Department)
            .FirstOrDefaultAsync(n => n.Id == id);

        if (nurse == null)
        {
            return NotFound();
        }

        return nurse;
    }

    // POST: api/nurses
    [HttpPost]
    public async Task<ActionResult<Nurse>> CreateNurse(Nurse nurse)
    {
        // Validate foreign keys
        if (!_context.Users.Any(u => u.Id == nurse.UserId))
        {
            return BadRequest("Invalid UserId.");
        }

        if (!_context.Departments.Any(d => d.Id == nurse.DepartmentId))
        {
            return BadRequest("Invalid DepartmentId.");
        }

        _context.Nurses.Add(nurse);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetNurse), new { id = nurse.Id }, nurse);
    }

    // PUT: api/nurses/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateNurse(Guid id, Nurse nurse)
    {
        if (id != nurse.Id)
        {
            return BadRequest();
        }

        // Validate foreign keys
        if (!_context.Users.Any(u => u.Id == nurse.UserId))
        {
            return BadRequest("Invalid UserId.");
        }

        if (!_context.Departments.Any(d => d.Id == nurse.DepartmentId))
        {
            return BadRequest("Invalid DepartmentId.");
        }

        _context.Entry(nurse).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Nurses.Any(n => n.Id == id))
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

    // DELETE: api/nurses/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNurse(Guid id)
    {
        var nurse = await _context.Nurses.FindAsync(id);
        if (nurse == null)
        {
            return NotFound();
        }

        _context.Nurses.Remove(nurse);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
