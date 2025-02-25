using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

public static class ServiceExtensions
{
    public static void ConfigureDatabaseAndIdentity(this IServiceCollection services)
    {
        // ✅ Read Database Credentials from .env
        var dbHost = Environment.GetEnvironmentVariable("DB_HOST") ?? "localhost";
        var dbPort = Environment.GetEnvironmentVariable("DB_PORT") ?? "5432";
        var dbName = Environment.GetEnvironmentVariable("DB_NAME") ?? "HospitalDB";
        var dbUser = Environment.GetEnvironmentVariable("DB_USER") ?? "postgres";
        var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "yourpassword";

        var connectionString = $"Host={dbHost};Port={dbPort};Database={dbName};Username={dbUser};Password={dbPassword}";

        // ✅ Configure PostgreSQL Database
        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(connectionString));

        // ✅ Add a simple Health Check service
        services.AddSingleton<IDatabaseHealthChecker>(new DatabaseHealthChecker(connectionString));

        services.AddIdentity<User, IdentityRole>()
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddDefaultTokenProviders();
    }

    public static void ConfigureJwtAuthentication(this IServiceCollection services)
    {
        // ✅ Read JWT Secret from Environment Variables
        var jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET");
        var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "YourApp";
        var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "YourUsers";

        if (string.IsNullOrEmpty(jwtSecret))
        {
            Console.WriteLine("ERROR: JWT_SECRET is null or empty!");
            throw new Exception("JWT_SECRET is missing! Check your environment variables.");
        }
        else
        {
            Console.WriteLine($"✅ JWT_SECRET Loaded: {jwtSecret.Length} characters long");
        }

        // ✅ Convert to bytes using UTF-8
        var keyBytes = Encoding.UTF8.GetBytes(jwtSecret);
        var key = new SymmetricSecurityKey(keyBytes);

        // ✅ Configure JWT Authentication
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                 ValidateIssuerSigningKey = true,
                IssuerSigningKey = key, // ✅ Corrected: Pass `SymmetricSecurityKey`
                ValidateIssuer = true,
                ValidIssuer = jwtIssuer ?? "your_app",
                ValidateAudience = true,
                ValidAudience = jwtAudience ?? "your_users",
                ValidateLifetime = true
            };
        });
    }
}
