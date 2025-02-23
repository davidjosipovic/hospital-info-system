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

        // ✅ Configure Identity (User Authentication)
        //services.AddIdentity<ApplicationUser, IdentityRole>()
         //   .AddEntityFrameworkStores<ApplicationDbContext>()
            //.AddDefaultTokenProviders();
    }

    public static void ConfigureJwtAuthentication(this IServiceCollection services)
    {
        // ✅ Read JWT Secret from Environment Variables
        var jwtSecret = Environment.GetEnvironmentVariable("JWT_SECRET") 
            ?? throw new InvalidOperationException("JWT_SECRET is missing.");
        var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "YourApp";
        var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "YourUsers";
        var key = Encoding.UTF8.GetBytes(jwtSecret);

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
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = jwtIssuer,
                ValidateAudience = true,
                ValidAudience = jwtAudience,
                ValidateLifetime = true
            };
        });
    }
}
