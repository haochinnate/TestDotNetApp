namespace TestDotNetApp.API.Models
{
    public class Like
    {
        // this should by User ID
        public int LikerId { get; set; }
        
        // this should by CarModel ID
        public int LikeeId { get; set; }

        public virtual User Liker { get; set; }

        public virtual CarModel Likee { get; set; }
    }
}