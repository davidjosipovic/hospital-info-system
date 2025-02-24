using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class SpecializationsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SpecializationsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/specializations
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Specialization>>> GetSpecializations()
    {
        return await _context.Specializations.ToListAsync();
    }

    // GET: api/specializations/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Specialization>> GetSpecialization(Guid id)
    {
        var specialization = await _context.Specializations.FindAsync(id);

        if (specialization == null)
        {
            return NotFound();
        }

        return specialization;
    }

    // POST: api/specializations
    [HttpPost]
    public async Task<ActionResult<Specialization>> CreateSpecialization(Specialization specialization)
    {
        _context.Specializations.Add(specialization);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSpecialization), new { id = specialization.Id }, specialization);
    }

    // PUT: api/specializations/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSpecialization(Guid id, Specialization specialization)
    {
        if (id != specialization.Id)
        {
            return BadRequest();
        }

        _context.Entry(specialization).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Specializations.Any(s => s.Id == id))
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

    // DELETE: api/specializations/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSpecialization(Guid id)
    {
        var specialization = await _context.Specializations.FindAsync(id);
        if (specialization == null)
        {
            return NotFound();
        }

        _context.Specializations.Remove(specialization);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
