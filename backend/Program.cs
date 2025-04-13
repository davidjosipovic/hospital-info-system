using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Configure the app to use different URLs in local and production environments
builder.WebHost.UseUrls(builder.Configuration["AppSettings:ServerUrl"] ?? "http://0.0.0.0:5214");

// Load appsettings.json and environment-specific configuration files (e.g., appsettings.Development.json, appsettings.Production.json)
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                     .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true);

// Configure services for database, identity, JWT authentication, CORS, and Swagger using the loaded configuration
builder.Services.ConfigureCors(builder.Configuration);
builder.Services.ConfigureDatabaseAndIdentity(builder.Configuration);
builder.Services.ConfigureJwtAuthentication(builder.Configuration);
builder.Services.ConfigureSwagger();
builder.Services.AddControllers();

var app = builder.Build();

// Global Exception Handling Middleware
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/json";

        var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
        if (exceptionHandlerPathFeature?.Error != null)
        {
            var errorResponse = new
            {
                Message = "An unexpected error occurred. Please try again later.",
                Details = exceptionHandlerPathFeature.Error.Message // Optional: Remove in production for security
            };

            var errorJson = JsonSerializer.Serialize(errorResponse);
            await context.Response.WriteAsync(errorJson);
        }
    });
});

// Apply the custom middleware
app.UseCustomMiddleware();
app.MapControllers();

// Run the app
app.Run();
