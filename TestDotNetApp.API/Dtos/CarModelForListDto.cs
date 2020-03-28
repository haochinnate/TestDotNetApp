using System;

namespace TestDotNetApp.API.Dtos
{
    public class CarModelForListDto
    {
        public int Id { get; set; }
        public string Maker { get; set; }
        public string ModelName { get; set; }
        public DateTime DayOfPublish { get; set; }
        public int Length { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int Price { get; set; }
        public double BootCapacity { get; set; }
        public string PhotoUrl { get; set; }
    }
}