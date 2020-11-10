using System;
using System.Collections.Generic;

namespace TestDotNetApp.API.Models
{
    public class CarModel
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
        public virtual ICollection<Photo> Photos { get; set; }
        public virtual ICollection<Like> Likers { get; set; }

        public virtual ICollection<Message> MessagesReceived { get; set; }

        // ESP: 
        // HSA: (Hill Start Assis)斜坡上坡起步輔助, 鬆開剎車時, 會維持剎車一段時間, 避免因斜坡往後滑
        // BSW: (Blind-spot warning)盲點偵測警示, 當車側車輛，進入後照鏡死角時提醒
        // FCW: (Forward-collision warning)前方碰撞預警
        // AEB: (Automatic emergency braking)自動緊急煞停
        // ACC: (Adaptive Cruise Control)主動車距巡航控制系統, 
        // LDW: (Lane Departure Warning)車道偏離警示, 告訴您現在的車道您走歪了
        // LKA: (Lane-keeping assist)車道維持輔助
        // RCTA: (Rear Cross Traffic Alert) 後方車側警示系統
    }
}