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
    

    public ServiceExtensionsTests()
    {
        _services = new ServiceCollection();

 
        Environment.SetEnvironmentVariable("JWT_SECRET", "supersecretkey_1234567890");
        Environment.SetEnvironmentVariable("JWT_ISSUER", "TestIssuer");
        Environment.SetEnvironmentVariable("JWT_AUDIENCE", "TestAudience");

    
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

    }

    [Fact]
    public void ConfigureDatabaseAndIdentity_ShouldRegisterServices()
    {
    
        _services.ConfigureDatabaseAndIdentity();
        var provider = _services.BuildServiceProvider();

     
        provider.GetService<ApplicationDbContext>().Should().NotBeNull();
        provider.GetService<UserManager<User>>().Should().NotBeNull();
        provider.GetService<SignInManager<User>>().Should().NotBeNull();
        provider.GetService<RoleManager<IdentityRole>>().Should().NotBeNull();
        provider.GetService<IDatabaseHealthChecker>().Should().NotBeNull();
    }

    [Fact]
    public void ConfigureJwtAuthentication_ShouldRegisterAuthentication()
    {
     
        _services.ConfigureJwtAuthentication();
        var provider = _services.BuildServiceProvider();

       
        provider.GetService<Microsoft.AspNetCore.Authentication.IAuthenticationService>().Should().NotBeNull();
    }
}
