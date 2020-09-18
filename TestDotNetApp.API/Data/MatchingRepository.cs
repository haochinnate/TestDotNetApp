using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TestDotNetApp.API.Helpers;
using TestDotNetApp.API.Models;

namespace TestDotNetApp.API.Data
{
    public class MatchingRepository : IMatchingRepository
    {
        private readonly DataContext _context;
        public MatchingRepository(DataContext context)
        {
            _context = context;    
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<CarModel> AddCarModel(CarModel carmodel)
        {
            await _context.CarModels.AddAsync(carmodel);
            await _context.SaveChangesAsync();

            return carmodel;
        }

        public async Task<CarModel> GetCarModel(int id)
        {
            // in course, this function is return a user (lecture 75)
            // also want to show photos, so have to use "Include"
            var carModel = await _context.CarModels.Include(p => p.Photos).FirstOrDefaultAsync(c => c.Id == id);
            return carModel;
        }

        public async Task<PagedList<CarModel>> GetCarModels(CarModelParams carmodelParams)
        {
            // in course, this function is return all users (lecture 75)
            
            // original is return IEnumerable<T> all carmodels
            // var carModels = await _context.CarModels.Include(p => p.Photos).ToListAsync();
            // return carModels;

            // pagination 
            var carmodels = _context.CarModels.Include(p => p.Photos)
                .OrderByDescending(c => c.Length).AsQueryable();

            // use the criteria in params to filter the models want to return 
            // users = users.Where(u => u.Id != userParmas.UserId);
            // users = users.Where(u => u.Gender == userParams.Gender);
            
            if (carmodelParams.Likers)
            {
                // var userLikers = await GetUserLikes(userParams.UserId, userParams.Likers);
                // users = users.Where(u => userLikers.Contains(u.Id));
            }

            if (carmodelParams.Likees)
            {
                // var userLikees = await GetUserLikes(userParams.UserId, carmodelParams.Likees);
                // carmodels = carmodels.Where(c => userLikees.Contains(c.Id));
            }

            // in course is checking the age of user
            // var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            // var maxDob = DateTime.Today.AddYears(-userParams.MinAge);
            // users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

            #region Filter Length
            if (carmodelParams.MinCarModelLength != CarModelParams.DefaultMinLength
                || carmodelParams.MaxCarModelLength != CarModelParams.DefaultMaxLength)
            {

                carmodels = carmodels.Where(c => c.Length >= carmodelParams.MinCarModelLength
                    && c.Length <= carmodelParams.MaxCarModelLength);
            }
            #endregion

            #region Filter Width    
            if (carmodelParams.MinCarModelWidth != CarModelParams.DefaultMinLength
                || carmodelParams.MaxCarModelWidth != CarModelParams.DefaultMaxLength)
            {

                carmodels = carmodels.Where(c => c.Width >= carmodelParams.MinCarModelWidth
                    && c.Width <= carmodelParams.MaxCarModelWidth);
            }
            #endregion

            #region Filter Height    
            if (carmodelParams.MinCarModelHeight != CarModelParams.DefaultMinLength
                || carmodelParams.MaxCarModelHeight != CarModelParams.DefaultMaxLength)
            {

                carmodels = carmodels.Where(c => c.Height >= carmodelParams.MinCarModelHeight
                    && c.Height <= carmodelParams.MaxCarModelHeight);
            }
            #endregion

            #region Filter BootCapacity    
            if (carmodelParams.MinBootCapacity != CarModelParams.DefaultMinLength
                || carmodelParams.MaxBootCapacity != CarModelParams.DefaultMaxLength)
            {

                carmodels = carmodels.Where(c => c.BootCapacity >= carmodelParams.MinBootCapacity
                    && c.BootCapacity <= carmodelParams.MaxBootCapacity);
            }
            #endregion

            #region Sorting Params                
            if (!string.IsNullOrEmpty(carmodelParams.OrderBy))
            {
                switch (carmodelParams.OrderBy)
                {
                    case "length":
                        carmodels = carmodels.OrderByDescending(c => c.Length);
                        break;
                    case "bootcapacity":
                        carmodels = carmodels.OrderByDescending(c => c.BootCapacity);
                        break;
                    default:
                        carmodels = carmodels.OrderByDescending(c => c.Length);
                        break;
                }
            }
            #endregion

            return await PagedList<CarModel>.CreateAsync(carmodels, carmodelParams.PageNumber, carmodelParams.PageSize);
        }

        private async Task<IEnumerable<int>> GetUserLikes(int id, bool likers)
        {

            // original example in course
            // var user = await _context.Users
            //     .Include(x => x.Likers)
            //     .Include(x => x.Likees)
            //     .FirstOrDefaultAsync(u => u.Id == id);

            // if (likers)
            // {
            //     return user.Likers.Where(u => u.LikeeId == id).Select(i => LikerId);
            // }
            // else
            // {
            //     return user.Likers.Where(u => u.LikerId == id).Select(i => LikeeId);
            // }

            var user = await _context.Users.Include(x => x.Likees)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (likers)
            {
                return user.Likees.Where(u => u.LikerId == id).Select(i => i.LikeeId);
            }
            return null;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            
            return photo;
        }

        public async Task<Photo> GetMainPhotoForCarmodel(int carmodelrId)
        {
            return await _context.Photos.Where(c => c.CarModelId == carmodelrId)
                .FirstOrDefaultAsync(p => p.IsMain);
        }
    
        public async Task<Like> GetLike(int userId, int carmodelId)
        {
            return await _context.Likes.FirstOrDefaultAsync(
                u => u.LikerId == userId && u.LikeeId == carmodelId);
        }

        #region Message Related function
            
        public async Task<Message> GetMessage(int messageId)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == messageId);
        }

        public async Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams)
        {
            // original 
            // .Include(u => u.Sender).ThenInclude(p => p.Photos)

            var messages = _context.Messages
                .Include(u => u.Sender)
                .Include(u => u.Recipient).ThenInclude(p => p.Photos)
                .AsQueryable();

            // filter the messages
            switch (messageParams.MessageContainer)
            {
                case "Inbox":
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId);
                    break;
                case "Outbox":
                    messages = messages.Where(u => u.SenderId == messageParams.UserId);
                    break;
                default:
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId && (!u.IsRead));
                    break;
            }

            // ordering the messages
            messages = messages.OrderByDescending(d => d.MessageSent);

            return await PagedList<Message>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<PagedList<Message>> GetMessagesForCarModel(MessageParams messageParams)
        {
              var messages = _context.Messages
                .Include(u => u.Sender)
                .Include(u => u.Recipient).ThenInclude(p => p.Photos)
                .AsQueryable();

            // filter the messages
            switch (messageParams.MessageContainer)
            {
                case "Inbox":
                    messages = messages.Where(u => u.RecipientId == messageParams.CarModelId);
                    break;
                case "Outbox":
                    messages = messages.Where(u => u.SenderId == messageParams.CarModelId);
                    break;
                default:
                    messages = messages.Where(u => u.RecipientId == messageParams.CarModelId && (!u.IsRead));
                    break;
            }

            // ordering the messages
            messages = messages.OrderByDescending(d => d.MessageSent);

            return await PagedList<Message>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessageThread(int userID, int recipientId)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Message>> GetMessageThread(int carmodelId)
        {
            throw new NotImplementedException();
        }
        #endregion

    }
}