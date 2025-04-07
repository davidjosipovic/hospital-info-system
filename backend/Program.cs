using Microsoft.Extensions.Configuration;

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

// Apply the custom middleware
app.UseCustomMiddleware();
app.MapControllers();

// Run the app
app.Run();
