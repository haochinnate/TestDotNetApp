using TestDotNetApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AutoMapper;
using TestDotNetApp.API.Dtos;
using System.Collections.Generic;
using System.Security.Claims;
using System;
using TestDotNetApp.API.Models;
using TestDotNetApp.API.Helpers;

namespace TestDotNetApp.API.Controllers
{
    [ServiceFilter(typeof(LogCarModelActivity))]
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

        // http://localhost:5000/api/carmodels/add
        [HttpPost("add")]
        public async Task<IActionResult> Add(CarModelForDetailedDto carmodelForDetailedDto)
        {
            var carmodelToCreate = new CarModel();
            
            _mapper.Map(carmodelForDetailedDto, carmodelToCreate);

            var createdCarmodel = await _repo.AddCarModel(carmodelToCreate);

            var carmodelToReturn = _mapper.Map<CarModelForDetailedDto>(createdCarmodel);

            // return StatusCode(201);
            return CreatedAtRoute("GetCarModel", new { controller = "CarModels", id = createdCarmodel.Id}, carmodelToReturn);
        }


        // http://localhost:5000/api/carmodels/
        [HttpGet]
        public async Task<IActionResult> GetCarModels([FromQuery]CarModelParams carModelParams)
        {
            var carModels = await _repo.GetCarModels(carModelParams);

            // return object of Dto class instead of Model class
            var carModelsToReturn = _mapper.Map<IEnumerable<CarModelForListDto>>(carModels);
            
            Response.AddPagination(carModels.CurrentPage, carModels.PageSize, 
                carModels.TotalCount, carModels.TotalPages);

            return Ok(carModelsToReturn);
        }
        
        [HttpGet("{Id}", Name="GetCarModel")]
        public async Task<IActionResult> GetCarModel(int id)
        {
            var carModel = await _repo.GetCarModel(id);

            // return object of Dto class instead of Model class
            var carModelToReturn = _mapper.Map<CarModelForDetailedDto>(carModel);

            return Ok(carModelToReturn);
        }
        
        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateCarModel(int id, CarModelForUpdateDto carModelForUpdateDto)
        {
            // check the user was attempting to update their profile matches the token
            // if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            // {
            //     return Unauthorized();
            // }
            
            // 原先課程的範例是 update 自己的 資料, 改成 update 任意車的資料, 所以應該不用上面的 check

            var carModelFromRepo = await _repo.GetCarModel(id);

            _mapper.Map(carModelForUpdateDto, carModelFromRepo);

            // save the changes
            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"Updating carmodel {id} failed on save");
        }
    }
}