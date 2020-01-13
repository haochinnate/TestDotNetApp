using System.ComponentModel.DataAnnotations;

namespace TestDotNetApp.API.Dtos
{
    public class UserForRegisterDto
    {
        // add data annotation
        // [EmailAddress]
        // [Phone]

        // [ApiController] annotation will auto send bad request 
        // if DataAnnotation is invalid

        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify password between 4 and 8 characters.")]
        public string Password { get; set; }
    }
}