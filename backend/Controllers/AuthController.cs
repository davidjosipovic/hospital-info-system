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
            Role = roleEnum.ToString().ToLower()
        };

        var result = await _userManager.CreateAsync(user, model.Password ?? string.Empty);
        if (!result.Succeeded)
            return BadRequest(result.Errors);

        return Ok("User registered successfully.");
    }

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
        var jwtSecret = _configuration["JWT:JWT_SECRET"];
        var jwtIssuer = _configuration["JWT:JWT_ISSUER"] ?? "your_app";
        var jwtAudience = _configuration["JWT:JWT_AUDIENCE"] ?? "your_users";
        var jwtExpirationMinutes = int.TryParse(_configuration["JWT:JWT_TOKEN_EXPIRATION_IN_MINUTES"], out var minutes) ? minutes : 120;

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
            new Claim(ClaimTypes.Role, user.Role ?? "user")
        };

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(jwtExpirationMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
