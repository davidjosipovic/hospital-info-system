using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;

public class UsersControllerTests
{
    private readonly Mock<UserManager<User>> _mockUserManager;
    private readonly UsersController _controller;

    public UsersControllerTests()
    {
        var mockUserStore = new Mock<IUserStore<User>>();

        _mockUserManager = new Mock<UserManager<User>>(
            mockUserStore.Object,
            new Mock<IOptions<IdentityOptions>>().Object,
            new Mock<IPasswordHasher<User>>().Object,
            new IUserValidator<User>[0],
            new IPasswordValidator<User>[0],
            new Mock<ILookupNormalizer>().Object,
            new Mock<IdentityErrorDescriber>().Object,
            new Mock<IServiceProvider>().Object,
            new Mock<ILogger<UserManager<User>>>().Object
        );

        _controller = new UsersController(_mockUserManager.Object);
    }

    [Fact]
    public async Task GetUsers_ShouldReturnListOfUsers()
    {
      
        var users = new List<User>
        {
            new User { Id = "1", FirstName = "John", LastName = "Doe", Email = "john@example.com" },
            new User { Id = "2", FirstName = "Jane", LastName = "Smith", Email = "jane@example.com" }
        }.AsQueryable();

        var mockUserDbSet = new Mock<DbSet<User>>();
        mockUserDbSet.As<IQueryable<User>>().Setup(m => m.Provider).Returns(users.Provider);
        mockUserDbSet.As<IQueryable<User>>().Setup(m => m.Expression).Returns(users.Expression);
        mockUserDbSet.As<IQueryable<User>>().Setup(m => m.ElementType).Returns(users.ElementType);
        mockUserDbSet.As<IQueryable<User>>().Setup(m => m.GetEnumerator()).Returns(users.GetEnumerator());

        mockUserDbSet.As<IAsyncEnumerable<User>>()
            .Setup(m => m.GetAsyncEnumerator(It.IsAny<CancellationToken>()))
            .Returns(new TestAsyncEnumerator<User>(users.GetEnumerator()));

        _mockUserManager.Setup(x => x.Users).Returns(mockUserDbSet.Object);

      
        var result = await _controller.GetUsers("john@example.com");

      
        result.Value.Should().NotBeNull();
        result.Value.Should().HaveCount(2);
    }

    [Fact]
    public async Task UpdateUser_ShouldReturnNoContent_WhenUpdateIsSuccessful()
    {
     
        var user = new User { Id = "1", FirstName = "Old Name" };
        _mockUserManager.Setup(x => x.FindByIdAsync("1")).ReturnsAsync(user);
        _mockUserManager.Setup(x => x.UpdateAsync(It.IsAny<User>())).ReturnsAsync(IdentityResult.Success);

        var updates = new Dictionary<string, object> { { "firstName", "New Name" } };

      
        var result = await _controller.UpdateUser("1", updates);

     
        result.Should().BeOfType<NoContentResult>();
        user.FirstName.Should().Be("New Name"); 
        _mockUserManager.Verify(x => x.UpdateAsync(user), Times.Once);
    }

    [Fact]
    public async Task UpdateUser_ShouldReturnBadRequest_WhenUpdateFails()
    {
     
        var user = new User { Id = "1", FirstName = "Old Name" };
        var identityErrors = new List<IdentityError>
        {
            new IdentityError { Code = "UpdateFailed", Description = "Unable to update user" }
        };
        _mockUserManager.Setup(x => x.FindByIdAsync("1")).ReturnsAsync(user);
        _mockUserManager.Setup(x => x.UpdateAsync(It.IsAny<User>())).ReturnsAsync(IdentityResult.Failed(identityErrors.ToArray()));

        var updates = new Dictionary<string, object> { { "firstName", "New Name" } };

   
        var result = await _controller.UpdateUser("1", updates);

     
        result.Should().BeOfType<BadRequestObjectResult>()
              .Which.Value.Should().BeEquivalentTo(identityErrors);
    }

    [Fact]
    public async Task DeleteUser_ShouldReturnNoContent_WhenUserExists()
    {
  
        var user = new User { Id = "1", FirstName = "John" };
        _mockUserManager.Setup(x => x.FindByIdAsync("1")).ReturnsAsync(user);
        _mockUserManager.Setup(x => x.DeleteAsync(It.IsAny<User>())).ReturnsAsync(IdentityResult.Success);

 
        var result = await _controller.DeleteUser("1");

   
        result.Should().BeOfType<NoContentResult>();
        _mockUserManager.Verify(x => x.DeleteAsync(user), Times.Once);
    }

    [Fact]
    public async Task DeleteUser_ShouldReturnBadRequest_WhenDeleteFails()
    {
    
        var user = new User { Id = "1", FirstName = "John" };
        var identityErrors = new List<IdentityError>
        {
            new IdentityError { Code = "DeleteFailed", Description = "User deletion failed" }
        };
        _mockUserManager.Setup(x => x.FindByIdAsync("1")).ReturnsAsync(user);
        _mockUserManager.Setup(x => x.DeleteAsync(It.IsAny<User>())).ReturnsAsync(IdentityResult.Failed(identityErrors.ToArray()));

    
        var result = await _controller.DeleteUser("1");

    
        result.Should().BeOfType<BadRequestObjectResult>()
              .Which.Value.Should().BeEquivalentTo(identityErrors);
    }
}


internal class TestAsyncEnumerator<T> : IAsyncEnumerator<T>
{
    private readonly IEnumerator<T> _inner;

    public TestAsyncEnumerator(IEnumerator<T> inner) => _inner = inner;

    public T Current => _inner.Current;

    public ValueTask DisposeAsync() => new ValueTask(Task.CompletedTask);

    public ValueTask<bool> MoveNextAsync() => new ValueTask<bool>(_inner.MoveNext());
}
