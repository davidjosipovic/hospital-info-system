using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

// ✅ Load Environment Variables from .env
Env.Load();

// ✅ Use Extensions to Configure Services
builder.Services.ConfigureDatabaseAndIdentity();
builder.Services.ConfigureJwtAuthentication();
builder.Services.ConfigureCors();
builder.Services.ConfigureSwagger();
builder.Services.AddControllers();

var app = builder.Build();

// ✅ Use Middleware Extensions
app.UseCustomMiddleware();
app.MapControllers();

app.Run();
