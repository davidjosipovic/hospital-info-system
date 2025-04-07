using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication;
using Moq;
using Xunit;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ServiceExtensionsTests
{
    private readonly IServiceCollection _services;
    private readonly IConfiguration _configuration;

    public ServiceExtensionsTests()
    {
        _services = new ServiceCollection();

        // Set up environment variables for JWT
        Environment.SetEnvironmentVariable("JWT_SECRET", "supersecretkey_1234567890");
        Environment.SetEnvironmentVariable("JWT_ISSUER", "TestIssuer");
        Environment.SetEnvironmentVariable("JWT_AUDIENCE", "TestAudience");

        // Set up IConfiguration
        var configurationBuilder = new ConfigurationBuilder()
            .AddInMemoryCollection(new[]
            {
                new KeyValuePair<string, string>("ConnectionStrings:DefaultConnection", "Host=localhost;Port=5432;Database=test_db;Username=postgres;Password=password")
            });
        _configuration = configurationBuilder.Build();

        // Mocking Identity related services
        _services.AddSingleton(Mock.Of<ILogger<UserManager<User>>>());
        _services.AddSingleton(Mock.Of<ILogger<RoleManager<IdentityRole>>>());
        _services.AddSingleton(Mock.Of<ILogger<SignInManager<User>>>());
        _services.AddSingleton(Mock.Of<ILogger<DataProtectorTokenProvider<User>>>());

        _services.AddSingleton(Mock.Of<IUserStore<User>>());
        _services.AddSingleton(Mock.Of<IRoleStore<IdentityRole>>());
        _services.AddSingleton<IPasswordHasher<User>, PasswordHasher<User>>();
        _services.AddSingleton<ILookupNormalizer, UpperInvariantLookupNormalizer>();
        _services.AddSingleton<IdentityErrorDescriber>();

        _services.AddSingleton<UserManager<User>>();
        _services.AddSingleton<RoleManager<IdentityRole>>();

        _services.AddSingleton<SignInManager<User>>(sp =>
            new SignInManager<User>(
                sp.GetRequiredService<UserManager<User>>(),
                Mock.Of<IHttpContextAccessor>(),
                Mock.Of<IUserClaimsPrincipalFactory<User>>(),
                Mock.Of<IOptions<IdentityOptions>>(),
                Mock.Of<ILogger<SignInManager<User>>>(),
                Mock.Of<IAuthenticationSchemeProvider>(),
                Mock.Of<IUserConfirmation<User>>()));

        // Add DbContext and Identity services for the test
        _services.AddDbContext<ApplicationDbContext>(options =>
            options.UseInMemoryDatabase("TestDb"));

        // Configure the services with the mock configuration
        _services.ConfigureDatabaseAndIdentity(_configuration);
        _services.ConfigureJwtAuthentication(_configuration);
    }

    [Fact]
    public void ConfigureDatabaseAndIdentity_ShouldRegisterServices()
    {
        var provider = _services.BuildServiceProvider();

        // Assert the ApplicationDbContext and Identity related services are registered
        provider.GetService<ApplicationDbContext>().Should().NotBeNull();
        provider.GetService<UserManager<User>>().Should().NotBeNull();
        provider.GetService<SignInManager<User>>().Should().NotBeNull();
        provider.GetService<RoleManager<IdentityRole>>().Should().NotBeNull();
    }

    [Fact]
    public void ConfigureJwtAuthentication_ShouldRegisterAuthentication()
    {
        var provider = _services.BuildServiceProvider();

        // Assert the authentication service is registered
        provider.GetService<Microsoft.AspNetCore.Authentication.IAuthenticationService>().Should().NotBeNull();
    }
}
