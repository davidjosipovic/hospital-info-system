using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://0.0.0.0:5214");

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
