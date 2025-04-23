using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.WebHost.UseUrls(builder.Configuration["AppSettings:ServerUrl"] ?? "http://0.0.0.0:5214");

        builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                         .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true);

        builder.Services.ConfigureCors(builder.Configuration);
        builder.Services.ConfigureDatabaseAndIdentity(builder.Configuration);
        builder.Services.ConfigureJwtAuthentication(builder.Configuration);
        builder.Services.ConfigureSwagger();
        builder.Services.AddControllers();

        var app = builder.Build();

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
                        Details = exceptionHandlerPathFeature.Error.Message 
                    };

                    var errorJson = JsonSerializer.Serialize(errorResponse);
                    await context.Response.WriteAsync(errorJson);
                }
            });
        });

        app.UseCustomMiddleware();
        app.MapControllers();

        app.Run();
    }
}
