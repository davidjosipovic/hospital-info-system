using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/health")]
public class HealthCheckController : ControllerBase
{
    private readonly IDatabaseHealthChecker _dbHealthChecker;

    public HealthCheckController(IDatabaseHealthChecker dbHealthChecker)
    {
        _dbHealthChecker = dbHealthChecker;
    }

    [HttpGet("db")]
    public IActionResult CheckDatabaseConnection()
    {
        if (_dbHealthChecker.IsDatabaseConnected())
        {
            return Ok(new { message = "✅ Database connection successful!" });
        }
        else
        {
            return StatusCode(500, new { message = "❌ Database connection failed." });
        }
    }
}
