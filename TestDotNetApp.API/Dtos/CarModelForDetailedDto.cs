using System;
using System.Collections.Generic;
using TestDotNetApp.API.Models;

namespace TestDotNetApp.API.Dtos
{
    public class CarModelForDetailedDto
    {
        public int Id { get; set; }
        public string Maker { get; set; }
        public string ModelName { get; set; }
        public string LevelName { get; set; }
        public string EnergyForm { get; set; }
        public DateTime DayOfPublish { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int Price { get; set; }
        public double HorsePower { get; set; }
        public int AirbagsNumber { get; set; }
        public double BootCapacity { get; set; }
        public string SizeAndType { get; set; }
        public double FuelConsumption { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<PhotosForDetailedDto> Photos { get; set; }
    }
}