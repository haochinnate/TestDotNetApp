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

        #region Like Related function
        Task<Like> GetLike(int userId, int carmodelId);
        
        #endregion

        #region Message Related function
        
        Task<Message> GetMessage(int messageId);
        Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams);
        Task<PagedList<Message>> GetMessagesForCarModel(MessageParams messageParams);
        Task<IEnumerable<Message>> GetMessageThread(int userID, int recipientId);
        Task<IEnumerable<Message>> GetMessageThread(int carmodelId);

        #endregion
    }
}