using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using FluentAssertions;
using System.Text;
using System.Reflection;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication;
using Xunit;

public class AuthControllerTests
{
    private readonly Mock<UserManager<User>> _mockUserManager;
    private readonly Mock<SignInManager<User>> _mockSignInManager;
    private readonly Mock<IConfiguration> _mockConfiguration;
    private readonly AuthController _controller;

    public AuthControllerTests()
    {
        var mockUserStore = new Mock<IUserStore<User>>();

        _mockUserManager = new Mock<UserManager<User>>(
            mockUserStore.Object,
            Mock.Of<IOptions<IdentityOptions>>(),
            Mock.Of<IPasswordHasher<User>>(),
            new IUserValidator<User>[0],
            new IPasswordValidator<User>[0],
            Mock.Of<ILookupNormalizer>(),
            Mock.Of<IdentityErrorDescriber>(),
            Mock.Of<IServiceProvider>(),
            Mock.Of<ILogger<UserManager<User>>>()
        );

        _mockSignInManager = new Mock<SignInManager<User>>(
            _mockUserManager.Object,
            Mock.Of<IHttpContextAccessor>(),
            Mock.Of<IUserClaimsPrincipalFactory<User>>(),
            Mock.Of<IOptions<IdentityOptions>>(),
            Mock.Of<ILogger<SignInManager<User>>>(),
            Mock.Of<IAuthenticationSchemeProvider>(),
            Mock.Of<IUserConfirmation<User>>()
        );

        _mockConfiguration = new Mock<IConfiguration>();

        _controller = new AuthController(
            _mockUserManager.Object,
            _mockSignInManager.Object,
            _mockConfiguration.Object
        );
    }

   
    [Fact]
    public async Task Register_ShouldReturnOk_WhenRegistrationSuccessful()
    {
   
        var registerDto = new RegisterDto
        {
            Email = "test@example.com",
            Password = "Test@1234",
            FirstName = "John",
            LastName = "Doe",
            Role = "doctor"
        };

        _mockUserManager.Setup(x => x.FindByEmailAsync(registerDto.Email))
            .ReturnsAsync((User?)null); 

        _mockUserManager.Setup(x => x.CreateAsync(It.IsAny<User>(), registerDto.Password))
            .ReturnsAsync(IdentityResult.Success);

    
        var result = await _controller.Register(registerDto);

     
        result.Should().BeOfType<OkObjectResult>()
            .Which.Value.Should().Be("User registered successfully.");
    }

 
    [Fact]
    public async Task Register_ShouldReturnBadRequest_WhenUserAlreadyExists()
    {
     
        var registerDto = new RegisterDto
        {
            Email = "test@example.com",
            Password = "Test@1234",
            Role = "doctor"
        };

        var existingUser = new User { Email = registerDto.Email };

        _mockUserManager.Setup(x => x.FindByEmailAsync(registerDto.Email))
            .ReturnsAsync(existingUser);

    
        var result = await _controller.Register(registerDto);

   
        result.Should().BeOfType<BadRequestObjectResult>()
            .Which.Value.Should().Be("User already exists.");
    }

 
    [Fact]
    public async Task Register_ShouldReturnBadRequest_WhenInvalidRole()
    {
    
        var registerDto = new RegisterDto
        {
            Email = "test@example.com",
            Password = "Test@1234",
            Role = "invalid_role"
        };


        var result = await _controller.Register(registerDto);

        result.Should().BeOfType<BadRequestObjectResult>()
            .Which.Value.Should().Be("Invalid role. Allowed values: 'admin', 'doctor', 'nurse'.");
    }

   
    [Fact]
    public async Task Login_ShouldReturnToken_WhenCredentialsAreValid()
    {

        var loginDto = new LoginDto
        {
            Email = "test@example.com",
            Password = "Test@1234"
        };

        var user = new User
        {
            Id = "1",
            Email = loginDto.Email,
            Role = "doctor"
        };

        _mockUserManager.Setup(x => x.FindByEmailAsync(loginDto.Email))
            .ReturnsAsync(user);

        _mockUserManager.Setup(x => x.CheckPasswordAsync(user, loginDto.Password))
            .ReturnsAsync(true);

        Environment.SetEnvironmentVariable("JWT_SECRET", "supersecurejwtsecretkey1234567891012");
        Environment.SetEnvironmentVariable("JWT_ISSUER", "TestIssuer");
        Environment.SetEnvironmentVariable("JWT_AUDIENCE", "TestAudience");

  
        var result = await _controller.Login(loginDto);


        result.Should().BeOfType<OkObjectResult>()
            .Which.Value.Should().NotBeNull();
    }

   
    [Fact]
    public async Task Login_ShouldReturnUnauthorized_WhenCredentialsAreInvalid()
    {
    
        var loginDto = new LoginDto
        {
            Email = "test@example.com",
            Password = "WrongPassword"
        };

        var user = new User
        {
            Id = "1",
            Email = loginDto.Email,
            Role = "doctor"
        };

        _mockUserManager.Setup(x => x.FindByEmailAsync(loginDto.Email))
            .ReturnsAsync(user);

        _mockUserManager.Setup(x => x.CheckPasswordAsync(user, loginDto.Password))
            .ReturnsAsync(false);


        var result = await _controller.Login(loginDto);

        result.Should().BeOfType<UnauthorizedObjectResult>()
            .Which.Value.Should().Be("Invalid email or password");
    }

  
    [Fact]
    public void GenerateJwtToken_ShouldReturnValidToken()
    {

        var user = new User
        {
            Id = "1",
            Email = "test@example.com",
            Role = "doctor"
        };

        var secureKey = Convert.ToBase64String(Encoding.UTF8.GetBytes("supersecurelongjwtkey_123456"));
Environment.SetEnvironmentVariable("JWT_SECRET", secureKey);
        Environment.SetEnvironmentVariable("JWT_ISSUER", "TestIssuer");
        Environment.SetEnvironmentVariable("JWT_AUDIENCE", "TestAudience");

   
        var method = typeof(AuthController)
            .GetMethod("GenerateJwtToken", BindingFlags.NonPublic | BindingFlags.Instance);

        var token = method?.Invoke(_controller, new object[] { user }) as string;

   
        token.Should().NotBeNullOrEmpty();
        token.Should().Contain(".");
    }
}
