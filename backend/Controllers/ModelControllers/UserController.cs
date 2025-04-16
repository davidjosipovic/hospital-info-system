using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly UserManager<User> _userManager;

    public UsersController(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers([FromQuery] string? email)
    {
        if (!string.IsNullOrEmpty(email))
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            return new List<User> { user };
        }

        return await _userManager.Users.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(string id)
    {
        var user = await _userManager.FindByIdAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(string id, [FromBody] Dictionary<string, object> updates)
    {
        var existingUser = await _userManager.FindByIdAsync(id);
        if (existingUser == null)
        {
            return NotFound("User not found.");
        }

        var userType = typeof(User);
        foreach (var update in updates)
        {
            var property = userType.GetProperty(update.Key, System.Reflection.BindingFlags.IgnoreCase | System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance);

            if (update.Value == null)
            {
                continue; 
            }

            try
            {
                if (update.Key.Equals("password", StringComparison.OrdinalIgnoreCase))
                {
                    if (!updates.ContainsKey("oldPassword"))
                    {
                        return BadRequest("You must provide 'oldPassword' to change your password.");
                    }

                    string oldPassword = updates["oldPassword"].ToString() ?? "";
                    string newPassword = update.Value.ToString() ?? "";

                    var passwordChangeResult = await _userManager.ChangePasswordAsync(existingUser, oldPassword, newPassword);
                    if (!passwordChangeResult.Succeeded)
                    {
                        return BadRequest(passwordChangeResult.Errors);
                    }

                    continue; 
                }

                if (update.Key.Equals("role", StringComparison.OrdinalIgnoreCase))
                {
                    if (!Enum.TryParse(typeof(UserRole), update.Value.ToString(), true, out var roleValue))
                    {
                        return BadRequest("Invalid role. Allowed values: 'Admin', 'Doctor', 'Nurse'.");
                    }
                    existingUser.Role = roleValue.ToString();
                    continue;
                }

                if (update.Key.Equals("email", StringComparison.OrdinalIgnoreCase))
                {
                    existingUser.UserName = update.Value.ToString();
                    existingUser.Email = update.Value.ToString();
                    continue;
                }

                object? convertedValue = update.Value;

                if (property != null)
                {
                    if (property.PropertyType == typeof(int) && int.TryParse(update.Value.ToString(), out int intResult))
                    {
                        convertedValue = intResult;
                    }
                    else if (property.PropertyType == typeof(DateTime) && DateTime.TryParse(update.Value.ToString(), out DateTime dateTimeResult))
                    {
                        convertedValue = dateTimeResult;
                    }
                    else if (property.PropertyType == typeof(bool) && bool.TryParse(update.Value.ToString(), out bool boolResult))
                    {
                        convertedValue = boolResult;
                    }
                    else if (property.PropertyType == typeof(Guid) && Guid.TryParse(update.Value.ToString(), out Guid guidResult))
                    {
                        convertedValue = guidResult;
                    }
                    else if (property.PropertyType == typeof(string))
                    {
                        convertedValue = update.Value.ToString();
                    }

                    property.SetValue(existingUser, convertedValue);
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error updating field '{update.Key}': {ex.Message}");
            }
        }

        var result = await _userManager.UpdateAsync(existingUser);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        var result = await _userManager.DeleteAsync(user);
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return NoContent();
    }
}
