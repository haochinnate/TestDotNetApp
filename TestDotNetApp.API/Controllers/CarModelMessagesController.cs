using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TestDotNetApp.API.Data;
using TestDotNetApp.API.Dtos;
using TestDotNetApp.API.Helpers;

namespace TestDotNetApp.API.Controllers
{
    [ServiceFilter(typeof(LogCarModelActivity))]
    [Authorize]
    [Route("api/carmodels/{carmodelId}/[controller]")]
    [ApiController]
    public class CarModelMessagesController : ControllerBase
    {
        
        private readonly IMatchingRepository _repo;
        private readonly IMapper _mapper;
        public CarModelMessagesController(IMatchingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // http://localhost:5000/api/carmodels/
        // [HttpGet("{id}", Name = "GetMessageForCarmodel")]
        // public async Task<IActionResult> GetMessage(int carmodelId, int id)
        // {
        //     var messageFromRepo = await _repo.GetMessage(id);

        //     if (messageFromRepo == null)
        //     {
        //         return NotFound();
        //     }

        //     return Ok(messageFromRepo);
        // }



        [HttpGet]
        public async Task<IActionResult> GetMessageForCarmodel(int carmodelId, 
            [FromQuery]MessageParams messageParams)
        {
            messageParams.CarModelId = carmodelId;

            var messagesFromRepo = await _repo.GetMessagesForCarModel(messageParams);

            var messages = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

            Response.AddPagination(messagesFromRepo.CurrentPage, messagesFromRepo.PageSize, 
                messagesFromRepo.TotalCount, messagesFromRepo.TotalPages);

            return Ok(messages);
        }

    }
}