using TestDotNetApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TestDotNetApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CarModelsController : ControllerBase
    {
        private readonly IMatchingRepository _repo;
        // private readonly IConfiguration _config;
        public CarModelsController(IMatchingRepository repo)
        {
            _repo = repo;
            // _config = config;
        }

        // http://localhost:5000/api/carmodels/
        //[HttpPost("register")]
        
    }
}