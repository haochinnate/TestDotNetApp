using TestDotNetApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace TestDotNetApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CarModelsController : ControllerBase
    {
        // original in course is UsersController, the api to get users 

        private readonly IMatchingRepository _repo;
        // private readonly IConfiguration _config;
        public CarModelsController(IMatchingRepository repo)
        {
            _repo = repo;
            // _config = config;
        }

        // http://localhost:5000/api/carmodels/
        //[HttpPost("register")]
        [HttpGet]
        public async Task<IActionResult> GetCarModels()
        {
            var carModels = await _repo.GetCarModels();

            return Ok(carModels);
        }
        
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetCarModel(int id)
        {
            var carModel = await _repo.GetCarModel(id);

            return Ok(carModel);
        }

        
    }
}