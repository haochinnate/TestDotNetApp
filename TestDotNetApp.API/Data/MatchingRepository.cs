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
            var carmodels = _context.CarModels.Include(p => p.Photos);

            // use the criteria in params to filter the models want to return 
            // users = users.Where(u => u.Id != userParmas.UserId);
            // users = users.Where(u => u.Gender == userParams.Gender);

            return await PagedList<CarModel>.CreateAsync(carmodels, carmodelParams.PageNumber, carmodelParams.PageSize);
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
    }
}