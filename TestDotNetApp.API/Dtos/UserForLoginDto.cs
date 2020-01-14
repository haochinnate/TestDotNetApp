using System.ComponentModel.DataAnnotations;

namespace TestDotNetApp.API.Dtos
{
    public class UserForLoginDto
    {
        // [Required]
        public string Username { get; set; }

        public string Password { get; set; }
    }
}