using Microsoft.OpenApi.Models;

public static class MiddlewareExtensions
{
    public static void ConfigureCors(this IServiceCollection services, IConfiguration configuration)
    {
        // Read allowed origin from appsettings.json or environment-specific settings
        var allowedOrigin = configuration["REACT_APP_URL"] ?? "http://localhost:3000";
        Console.WriteLine("Allowed Origin: " + configuration["REACT_APP_URL"]);

        services.AddCors(options =>
        {
            options.AddPolicy("AllowReactApp", policy =>
                policy.WithOrigins(allowedOrigin)
                      .AllowAnyMethod()
                      .AllowCredentials()
                      .AllowAnyHeader());
        });
    }

    public static void ConfigureSwagger(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        
        // Add Swagger with JWT Support
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo { Title = "Hospital API", Version = "v1" });

            // Enable "Authorize" button in Swagger
            var securityScheme = new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Description = "Enter 'Bearer {your JWT token}' below (without quotes)",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT"
            };

            options.AddSecurityDefinition("Bearer", securityScheme);

            // Require JWT authentication for protected endpoints
            var securityRequirement = new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    new string[] {} // Empty array means it applies globally
                }
            };
            options.AddSecurityRequirement(securityRequirement);
        });
    }

    public static void UseCustomMiddleware(this WebApplication app)
    {
        // Apply CORS Policy
        app.UseCors("AllowReactApp");

        // Enable Swagger for Development Mode
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // Enable Authentication & Authorization Middleware
        app.UseAuthentication();
        app.UseAuthorization();
    }
}
