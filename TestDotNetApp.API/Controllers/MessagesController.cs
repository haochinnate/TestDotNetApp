using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TestDotNetApp.API.Data;
using TestDotNetApp.API.Dtos;
using TestDotNetApp.API.Helpers;
using TestDotNetApp.API.Models;

namespace TestDotNetApp.API.Controllers
{
    [ServiceFilter(typeof(LogCarModelActivity))]
    [Authorize]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        
        private readonly IMatchingRepository _repo;
        private readonly IMapper _mapper;
        public MessagesController(IMatchingRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        // http://localhost:5000/api/carmodels/
        [HttpGet("{id}", Name = "GetMessage")]
        public async Task<IActionResult> GetMessage(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            

            var messageFromRepo = await _repo.GetMessage(id);

            if (messageFromRepo == null)
            {
                return NotFound();
            }

            return Ok(messageFromRepo);
        }

        // http://localhsot:5000/api/users/3/messages
        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId, MessageForCreationDto messageForCreationDto)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            messageForCreationDto.SenderId = userId;

            var recipient = await _repo.GetCarModel(messageForCreationDto.RecipientId);
            if (recipient == null)
            {
                return BadRequest("Could not find user");
            }

            var message = _mapper.Map<Message>(messageForCreationDto);

            _repo.Add(message);
            
            var messageToReturn = _mapper.Map<MessageForCreationDto>(message);


            if (await _repo.SaveAll())
            {
                // return CreatedAtRoute("GetMessage", new {userId, id = message.Id }, messageToReturn);
                return CreatedAtRoute("GetMessage", new {userId, id = message.Id }, messageToReturn);
            }

            throw new System.Exception("Creating the message failed on save");
        }

    }
}