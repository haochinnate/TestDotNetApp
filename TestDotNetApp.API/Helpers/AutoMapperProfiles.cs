using System.Linq;
using AutoMapper;
using TestDotNetApp.API.Dtos;
using TestDotNetApp.API.Models;

namespace TestDotNetApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // CarModel -> CarModelForListDto
            CreateMap<CarModel, CarModelForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url));
            
            // original course has Age property in User
            //     .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));

            // CarModel -> CarModelForDetailedDto
            CreateMap<CarModel, CarModelForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url));
            
            // Photo -> PhotosForDetailedDto
            CreateMap<Photo, PhotosForDetailedDto>();

            // CarModelForUpdateDto -> CarModel
            CreateMap<CarModelForUpdateDto, CarModel>();
            CreateMap<CarModelForDetailedDto, CarModel>();

            // Photo -> PhotosForReturnDto
            CreateMap<Photo, PhotoForReturnDto>();

            // PhotoForCreationDto -> Photo
            CreateMap<PhotoForCreationDto, Photo>();

            // after add the property to UserForRegisterDto, add this mapping
            // CreateMap<UserForRegisterDto, User>();

            // MessageForCreationDto -> Message, and vice versa
            CreateMap<MessageForCreationDto, Message>().ReverseMap();

            // Message -> MessageForReturnDto
            // CreateMap<Message, MessageToReturnDto>()
            //     .ForMember(m => m.SenderPhotoUrl, opt => opt
            //         .MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
            //     .ForMember(m => m.RecipientPhotoUrl, opt => opt
            //         .MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));
        }
    }
}