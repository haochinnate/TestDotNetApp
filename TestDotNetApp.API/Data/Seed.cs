using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using TestDotNetApp.API.Models;

namespace TestDotNetApp.API.Data
{
    /// json data serialize to objects 
    public class Seed
    {
        public static void SeedCarModels(DataContext context)
        {
            if (!context.CarModels.Any())
            {
                var carModelData = System.IO.File.ReadAllText(@"Data/CarModelSeedData.json");
                var carModels = JsonConvert.DeserializeObject<List<CarModel>>(carModelData);
                foreach (var carModel in carModels)
                {
                    // example in course is add json(User) to DB
                    // byte[] passwordHash, passwordSalt;
                    // CreatePasswordHash("password", out passwordHash, out passwordSalt);
                    // user.PasswordHash = passwordHash;
                    // user.PasswordSalt = passwordSalt;
                    // user.Username = user.Username.ToLower();
                    // context.Users.Add(user);
                    context.CarModels.Add(carModel);
                }

                // save changes 
                context.SaveChanges();
            }
        }

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            { 
                passwordSalt = hmac.Key; 
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)); 
            }
        }
    }
}