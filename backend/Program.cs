using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

builder.Services.ConfigureDatabaseAndIdentity();
builder.Services.ConfigureJwtAuthentication();
builder.Services.ConfigureCors();
builder.Services.ConfigureSwagger();
builder.Services.AddControllers();

var app = builder.Build();

app.UseCustomMiddleware();
app.MapControllers();

app.Run();
