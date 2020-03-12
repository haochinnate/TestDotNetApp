using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
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
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
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

        [HttpPost("login")]
        public async Task<ActionResult> Login(UserForLoginDto userForLoginDto)
        {
            // try
            // {
                throw new Exception("computer says no!");

                // check is user exist
                var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

                if (userFromRepo == null)
                {
                    return Unauthorized();
                }

                #region Build a token
    
                // build a token that return to user
                // this token contains two Claims (Id, Username)
                var claims = new []
                {
                    new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                    new Claim(ClaimTypes.Name, userFromRepo.UserName),
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.
                    GetBytes(_config.GetSection("AppSettings:Token").Value));

                var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

                // token descripter
                var tokenDescripter = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddDays(1),
                    SigningCredentials = credentials
                };

                // token handler(to create token based on token descripter)
                var tokenHandler = new JwtSecurityTokenHandler();

                var token = tokenHandler.CreateToken(tokenDescripter);
                #endregion

                return Ok(new {
                    token = tokenHandler.WriteToken(token)
                });
            // }
            // catch (System.Exception)
            // {
            //     return StatusCode(500, "catch block in login");
            // }
        } 
    }
}