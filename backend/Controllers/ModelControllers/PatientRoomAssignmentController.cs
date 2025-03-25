using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class PatientRoomAssignmentsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PatientRoomAssignmentsController(ApplicationDbContext context)
    {
        _context = context;
    }


    [HttpGet]
    public async Task<ActionResult<IEnumerable<PatientRoomAssignment>>> GetPatientRoomAssignments()
    {
        return await _context.PatientRoomAssignments
            .Include(p => p.Patient)
            .Include(r => r.Room)
            .ToListAsync();
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<PatientRoomAssignment>> GetPatientRoomAssignment(Guid id)
    {
        var assignment = await _context.PatientRoomAssignments
            .Include(p => p.Patient)
            .Include(r => r.Room)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (assignment == null)
        {
            return NotFound();
        }

        return assignment;
    }


    [HttpPost]
    public async Task<ActionResult<PatientRoomAssignment>> CreatePatientRoomAssignment(PatientRoomAssignment assignment)
    {

        if (!_context.Patients.Any(p => p.Id == assignment.PatientId))
        {
            return BadRequest("Invalid PatientId.");
        }

        if (!_context.HospitalRooms.Any(r => r.Id == assignment.RoomId))
        {
            return BadRequest("Invalid RoomId.");
        }

        _context.PatientRoomAssignments.Add(assignment);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPatientRoomAssignment), new { id = assignment.Id }, assignment);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePatientRoomAssignment(Guid id, PatientRoomAssignment assignment)
    {
        if (id != assignment.Id)
        {
            return BadRequest();
        }


        if (!_context.Patients.Any(p => p.Id == assignment.PatientId))
        {
            return BadRequest("Invalid PatientId.");
        }

        if (!_context.HospitalRooms.Any(r => r.Id == assignment.RoomId))
        {
            return BadRequest("Invalid RoomId.");
        }

        _context.Entry(assignment).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.PatientRoomAssignments.Any(a => a.Id == id))
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
    public async Task<IActionResult> DeletePatientRoomAssignment(Guid id)
    {
        var assignment = await _context.PatientRoomAssignments.FindAsync(id);
        if (assignment == null)
        {
            return NotFound();
        }

        _context.PatientRoomAssignments.Remove(assignment);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
