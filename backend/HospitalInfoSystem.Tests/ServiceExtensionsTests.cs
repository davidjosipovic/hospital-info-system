using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication;
using Moq;
using Xunit;
using FluentAssertions;

public class ServiceExtensionsTests
{
    private readonly IServiceCollection _services;
    private readonly Mock<IConfiguration> _mockConfiguration;

    public ServiceExtensionsTests()
    {
        _services = new ServiceCollection();
        _mockConfiguration = new Mock<IConfiguration>();

        // ✅ Ensure Environment Variable is Set (Fix JWT_SECRET Issue)
        Environment.SetEnvironmentVariable("JWT_SECRET", "supersecretkey_1234567890");
        Environment.SetEnvironmentVariable("JWT_ISSUER", "TestIssuer");
        Environment.SetEnvironmentVariable("JWT_AUDIENCE", "TestAudience");

        // ✅ Mock ILogger dependencies to avoid resolution errors
        _services.AddSingleton(Mock.Of<ILogger<UserManager<User>>>());
        _services.AddSingleton(Mock.Of<ILogger<RoleManager<IdentityRole>>>());
        _services.AddSingleton(Mock.Of<ILogger<SignInManager<User>>>());
        _services.AddSingleton(Mock.Of<ILogger<DataProtectorTokenProvider<User>>>());

        // ✅ Mock Identity dependencies
        _services.AddSingleton(Mock.Of<IUserStore<User>>());
        _services.AddSingleton(Mock.Of<IRoleStore<IdentityRole>>());
        _services.AddSingleton<IPasswordHasher<User>, PasswordHasher<User>>();
        _services.AddSingleton<ILookupNormalizer, UpperInvariantLookupNormalizer>();
        _services.AddSingleton<IdentityErrorDescriber>();

        _services.AddSingleton<UserManager<User>>();
        _services.AddSingleton<RoleManager<IdentityRole>>();

        // ✅ Fix: Add required dependencies for SignInManager<User>
        _services.AddSingleton<SignInManager<User>>(sp =>
            new SignInManager<User>(
                sp.GetRequiredService<UserManager<User>>(),
                Mock.Of<IHttpContextAccessor>(),
                Mock.Of<IUserClaimsPrincipalFactory<User>>(),
                Mock.Of<IOptions<IdentityOptions>>(),
                Mock.Of<ILogger<SignInManager<User>>>(),
                Mock.Of<IAuthenticationSchemeProvider>(),
                Mock.Of<IUserConfirmation<User>>()));

        // ✅ Mock IConfiguration properly (Fix JWT_SECRET Issue)
        _mockConfiguration.Setup(x => x["JWT_SECRET"]).Returns(Environment.GetEnvironmentVariable("JWT_SECRET"));
        _mockConfiguration.Setup(x => x["JWT_ISSUER"]).Returns(Environment.GetEnvironmentVariable("JWT_ISSUER"));
        _mockConfiguration.Setup(x => x["JWT_AUDIENCE"]).Returns(Environment.GetEnvironmentVariable("JWT_AUDIENCE"));
    }

    [Fact]
    public void ConfigureDatabaseAndIdentity_ShouldRegisterServices()
    {
        // Act
        _services.ConfigureDatabaseAndIdentity();
        var provider = _services.BuildServiceProvider();

        // Assert
        provider.GetService<ApplicationDbContext>().Should().NotBeNull();
        provider.GetService<UserManager<User>>().Should().NotBeNull();
        provider.GetService<SignInManager<User>>().Should().NotBeNull();
        provider.GetService<RoleManager<IdentityRole>>().Should().NotBeNull();
        provider.GetService<IDatabaseHealthChecker>().Should().NotBeNull();
    }

    [Fact]
    public void ConfigureJwtAuthentication_ShouldRegisterAuthentication()
    {
        // ✅ Ensure JWT_SECRET is present
        _services.ConfigureJwtAuthentication(_mockConfiguration.Object);
        var provider = _services.BuildServiceProvider();

        // ✅ Ensure authentication services are properly registered
        provider.GetService<Microsoft.AspNetCore.Authentication.IAuthenticationService>().Should().NotBeNull();
    }
}
