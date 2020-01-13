using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestDotNetApp.API.Data;
using TestDotNetApp.API.Dtos;
using TestDotNetApp.API.Models;

namespace TestDotNetApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo)
        {
            _repo = repo;
        }

        // http://localhost:5000/api/auth/register
        [HttpPost("register")]
        // public async Task<IActionResult> Register(string username, string password) // replace with DTO argument
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            // validate request
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await _repo.UserExists(userForRegisterDto.Username))
            {
                return BadRequest("Username already exists!!");
            }

            var userToCreate = new User
            {
                UserName = userForRegisterDto.Username,
            };

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }

        // [HttpPost("login")]
        // public async Task<ActionResult> Login(UserForLoginDto userForLoginDto)
        // {


        // }
    }
}