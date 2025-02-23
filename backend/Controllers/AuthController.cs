using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IConfiguration _configuration;

    public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
    }

    // ✅ Register User
    [HttpPost("register")]
public async Task<IActionResult> Register([FromBody] RegisterDto model)
{
    if (string.IsNullOrWhiteSpace(model.Email) || string.IsNullOrWhiteSpace(model.Password))
        return BadRequest("Email and Password are required.");

    if (!Enum.TryParse<UserRole>(model.Role, true, out var roleEnum)) 
        return BadRequest("Invalid role. Allowed values: 'admin', 'doctor', 'nurse'.");

    var existingUser = await _userManager.FindByEmailAsync(model.Email ?? string.Empty);
    if (existingUser != null)
        return BadRequest("User already exists.");

    var user = new User
    {
        UserName = model.Email,
        Email = model.Email,
        FirstName = model.FirstName ?? "N/A",
        LastName = model.LastName ?? "N/A",
        Role = roleEnum.ToString().ToLower() // ✅ Converts enum to lowercase (admin, doctor, nurse)
    };

    var result = await _userManager.CreateAsync(user, model.Password ?? string.Empty);
    if (!result.Succeeded)
        return BadRequest(result.Errors);

    return Ok("User registered successfully.");
}

    // ✅ Login User & Generate JWT
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email ?? string.Empty);
        if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password ?? string.Empty))
            return Unauthorized("Invalid email or password");

        var token = GenerateJwtToken(user);
        return Ok(new { token });
    }

    private string GenerateJwtToken(User user)
{
    var jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET");

    if (string.IsNullOrEmpty(jwtSecret))
    {
        throw new Exception("❌ JWT_SECRET is missing or empty in GenerateJwtToken!");
    }

    var keyBytes = Encoding.UTF8.GetBytes(jwtSecret);
    
    if (keyBytes.Length < 16)
    {
        throw new Exception($"❌ JWT_SECRET is too short! It must be at least 16 bytes (current: {keyBytes.Length} bytes)");
    }

    var key = new SymmetricSecurityKey(keyBytes);
    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var claims = new List<Claim>
    {
        new Claim(JwtRegisteredClaimNames.Sub, user.Id ?? ""),
        new Claim(JwtRegisteredClaimNames.Email, user.Email ?? ""),
        new Claim(ClaimTypes.Role, user.Role ?? "User")
    };

    var token = new JwtSecurityToken(
        issuer: Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "your_app",
        audience: Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "your_users",
        claims: claims,
        expires: DateTime.UtcNow.AddHours(2),
        signingCredentials: credentials
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}

}
