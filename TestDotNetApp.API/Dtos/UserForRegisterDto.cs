using System;
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

        // new property for register
        // [Required]
        // public string Gender { get; set; }
        // [Required]
        // public string KnownAs { get; set; }
        // [Required]
        // public DateTime DateOfBirth { get; set; }
        // [Required]
        // public string City { get; set; }
        // [Required]
        // public string Country { get; set; }

        // public DateTime Created { get; set; }
        // public DateTime LastActive { get; set; }

        // public UserForRegisterDto()
        // {
        //     Created = DateTime.Now;
        //     LastActive = DateTime.Now;
        // }
    }
}