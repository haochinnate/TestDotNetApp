using System;

namespace TestDotNetApp.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public CarModel CarModel { get; set; }
        public int CarModelId { get; set; }
    }
}