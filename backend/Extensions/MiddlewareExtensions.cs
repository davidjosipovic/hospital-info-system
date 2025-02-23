using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;

public static class MiddlewareExtensions
{
    public static void ConfigureCors(this IServiceCollection services)
    {
        var allowedOrigin = Environment.GetEnvironmentVariable("REACT_APP_URL") ?? "http://localhost:5173";

        services.AddCors(options =>
        {
            options.AddPolicy("AllowReactApp", policy =>
                policy.WithOrigins(allowedOrigin)
                      .AllowAnyMethod()
                      .AllowAnyHeader());
        });
    }

    public static void ConfigureSwagger(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
    }

    public static void UseCustomMiddleware(this WebApplication app)
    {
        // ✅ Apply CORS Policy
        app.UseCors("AllowReactApp");

        // ✅ Enable Swagger for Development Mode
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        // ✅ Enable Authentication & Authorization Middleware
        app.UseAuthentication();
        app.UseAuthorization();
    }
}
