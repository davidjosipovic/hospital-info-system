using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class HospitalRoomsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public HospitalRoomsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/hospitalrooms
    [HttpGet]
    public async Task<ActionResult<IEnumerable<HospitalRoom>>> GetHospitalRooms()
    {
        return await _context.HospitalRooms.ToListAsync();
    }

    // GET: api/hospitalrooms/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<HospitalRoom>> GetHospitalRoom(Guid id)
    {
        var hospitalRoom = await _context.HospitalRooms.FindAsync(id);

        if (hospitalRoom == null)
        {
            return NotFound();
        }

        return hospitalRoom;
    }

    // POST: api/hospitalrooms
    [HttpPost]
    public async Task<ActionResult<HospitalRoom>> CreateHospitalRoom(HospitalRoom hospitalRoom)
    {
        // Ensure room number is unique
        if (_context.HospitalRooms.Any(r => r.RoomNumber == hospitalRoom.RoomNumber))
        {
            return BadRequest("Room number must be unique.");
        }

        _context.HospitalRooms.Add(hospitalRoom);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetHospitalRoom), new { id = hospitalRoom.Id }, hospitalRoom);
    }

    // PUT: api/hospitalrooms/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateHospitalRoom(Guid id, HospitalRoom hospitalRoom)
    {
        if (id != hospitalRoom.Id)
        {
            return BadRequest();
        }

        // Ensure room number is still unique (if changed)
        if (_context.HospitalRooms.Any(r => r.RoomNumber == hospitalRoom.RoomNumber && r.Id != id))
        {
            return BadRequest("Room number must be unique.");
        }

        _context.Entry(hospitalRoom).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.HospitalRooms.Any(r => r.Id == id))
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

    // DELETE: api/hospitalrooms/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteHospitalRoom(Guid id)
    {
        var hospitalRoom = await _context.HospitalRooms.FindAsync(id);
        if (hospitalRoom == null)
        {
            return NotFound();
        }

        _context.HospitalRooms.Remove(hospitalRoom);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
