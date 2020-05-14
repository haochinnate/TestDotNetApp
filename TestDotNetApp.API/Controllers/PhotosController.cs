using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TestDotNetApp.API.Data;
using TestDotNetApp.API.Dtos;
using TestDotNetApp.API.Helpers;
using TestDotNetApp.API.Models;

namespace TestDotNetApp.API.Controllers
{
    [Authorize]
    [Route("api/carmodels/{carmodelId}/[controller]")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        #region Field            
        private readonly IMatchingRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        #endregion

        public PhotosController(IMatchingRepository repo,
            IMapper mapper,
            IOptions<CloudinarySettings> cloudinaryConfig)
        {
            this._repo = repo;
            this._mapper = mapper;
            this._cloudinaryConfig = cloudinaryConfig;

            Account account = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(account);
        }

        [HttpGet("{id}", Name="GetPhoto")]
        public async Task<ActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }


        [HttpPost]
        public async Task<IActionResult> AddPhotoForCarmodel(int carmodelId, 
            [FromForm]PhotoForCreationDto photoForCreationDto)
        {
            // 原先課程的範例是 上傳 user 的圖片, 所以需要確認 ID, 這邊不用
            // check the user was attempting to update their profile matches the token
            // if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            // {
            //     return Unauthorized();
            // }
            
            var carModelFromRepo = await _repo.GetCarModel(carmodelId);
            
            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams(){
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
                
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            // if carmodel doesn't have main photo
            if (!carModelFromRepo.Photos.Any(u => u.IsMain))
            {
                photo.IsMain = true;
            }

            carModelFromRepo.Photos.Add(photo);

            if (await _repo.SaveAll())
            {
                // return Ok();
                // do not return "photo" object directly, use object of PhotoForReturnDto

                // photo will have Id after SaveAll() success
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto", new { carmodelId = carmodelId, id = photo.Id},
                    photoToReturn);
            }
            else
            {
                return BadRequest("Could not add the photo");
            }
        }

        // id of photo
        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int carmodelId, int id)
        {
            // if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            // {
            //     return Unauthorized();
            // }
            var carModelFromRepo = await _repo.GetCarModel(carmodelId);

            // check the Id is the photo of that user(carmodel)
            if (!carModelFromRepo.Photos.Any(p => p.Id == id))
            {
                return Unauthorized();
            }


            var photoFromRepo= await _repo.GetPhoto(id);
            if (photoFromRepo.IsMain)
            {
                return BadRequest("This is already the main photo");
            }

            return Ok();
        }
        
    }
}