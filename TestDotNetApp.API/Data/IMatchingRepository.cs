using System.Collections.Generic;
using System.Threading.Tasks;
using TestDotNetApp.API.Helpers;
using TestDotNetApp.API.Models;

namespace TestDotNetApp.API.Data
{
    public interface IMatchingRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();

        Task<CarModel> AddCarModel(CarModel carmodel);
        Task<PagedList<CarModel>> GetCarModels(CarModelParams carmodelParamas);
        Task<CarModel> GetCarModel(int id);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForCarmodel(int carmodelId);
    }
}