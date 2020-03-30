using TestDotNetApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AutoMapper;
using TestDotNetApp.API.Dtos;
using System.Collections.Generic;

namespace TestDotNetApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CarModelsController : ControllerBase
    {
        // original in course is UsersController, the api to get users 

        private readonly IMatchingRepository _repo;
        private readonly IMapper _mapper;

        // private readonly IConfiguration _config;
        public CarModelsController(IMatchingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
            // _config = config;
        }

        // http://localhost:5000/api/carmodels/
        //[HttpPost("register")]
        [HttpGet]
        public async Task<IActionResult> GetCarModels()
        {
            var carModels = await _repo.GetCarModels();

            // return object of Dto class instead of Model class
            var carModelsToReturn = _mapper.Map<IEnumerable<CarModelForListDto>>(carModels);
            
            return Ok(carModelsToReturn);
        }
        
        [HttpGet("{Id}")]
        public async Task<IActionResult> GetCarModel(int id)
        {
            var carModel = await _repo.GetCarModel(id);

            // return object of Dto class instead of Model class
            var carModelToReturn = _mapper.Map<CarModelForDetailedDto>(carModel);

            return Ok(carModelToReturn);
        }
        
    }
}