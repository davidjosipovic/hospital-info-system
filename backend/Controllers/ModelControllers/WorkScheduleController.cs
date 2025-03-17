using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
[Authorize] 
public class WorkSchedulesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public WorkSchedulesController(ApplicationDbContext context)
    {
        _context = context;
    }

    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<WorkSchedule>>> GetWorkSchedules()
    {
        return await _context.WorkSchedules
            .Include(w => w.User)
            .ToListAsync();
    }

   
    [HttpGet("{id}")]
    public async Task<ActionResult<WorkSchedule>> GetWorkSchedule(Guid id)
    {
        var workSchedule = await _context.WorkSchedules
            .Include(w => w.User)
            .FirstOrDefaultAsync(w => w.Id == id);

        if (workSchedule == null)
        {
            return NotFound();
        }

        return workSchedule;
    }

    
    [HttpPost]
    public async Task<ActionResult<WorkSchedule>> CreateWorkSchedule(WorkSchedule workSchedule)
    {
        
        if (!_context.Users.Any(u => u.Id == workSchedule.UserId))
        {
            return BadRequest("Invalid UserId.");
        }

        _context.WorkSchedules.Add(workSchedule);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetWorkSchedule), new { id = workSchedule.Id }, workSchedule);
    }

    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateWorkSchedule(Guid id, WorkSchedule workSchedule)
    {
        if (id != workSchedule.Id)
        {
            return BadRequest();
        }

       
        if (!_context.Users.Any(u => u.Id == workSchedule.UserId))
        {
            return BadRequest("Invalid UserId.");
        }

        _context.Entry(workSchedule).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.WorkSchedules.Any(w => w.Id == id))
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
    public async Task<IActionResult> DeleteWorkSchedule(Guid id)
    {
        var workSchedule = await _context.WorkSchedules.FindAsync(id);
        if (workSchedule == null)
        {
            return NotFound();
        }

        _context.WorkSchedules.Remove(workSchedule);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
