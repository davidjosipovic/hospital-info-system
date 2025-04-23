using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

public static class ServiceExtensions
{
    public static void ConfigureDatabaseAndIdentity(this IServiceCollection services, IConfiguration configuration)
    {
        var dbHost = configuration["PostgreSQL:DB_HOST"] ?? "db";
        var dbPort = configuration["PostgreSQL:DB_PORT"] ?? "5432";
        var dbName = configuration["PostgreSQL:DB_NAME"] ?? "hospital_bis";
        var dbUser = configuration["PostgreSQL:DB_USER"] ?? "postgres";
        var dbPassword = configuration["PostgreSQL:DB_PASSWORD"] ?? "password";

        var connectionString = $"Host={dbHost};Port={dbPort};Database={dbName};Username={dbUser};Password={dbPassword}";

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(connectionString));

        services.AddIdentity<User, IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();
    }

    public static void ConfigureJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        var jwtSecret = configuration["JWT:JWT_SECRET"];
        var jwtIssuer = configuration["JWT:JWT_ISSUER"] ?? "YourApp";
        var jwtAudience = configuration["JWT:JWT_AUDIENCE"] ?? "YourUsers";

        if (string.IsNullOrEmpty(jwtSecret))
        {
            Console.WriteLine("ERROR: JWT_SECRET is null or empty!");
            throw new Exception("JWT_SECRET is missing! Check your configuration.");
        }
        else
        {
            Console.WriteLine($"✅ JWT_SECRET Loaded: {jwtSecret.Length} characters long");
        }

        var keyBytes = Encoding.UTF8.GetBytes(jwtSecret);
        var key = new SymmetricSecurityKey(keyBytes);

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
                IssuerSigningKey = key,
                ValidateIssuer = true,
                ValidIssuer = jwtIssuer,
                ValidateAudience = true,
                ValidAudience = jwtAudience,
                ValidateLifetime = true
            };
        });
    }
}
