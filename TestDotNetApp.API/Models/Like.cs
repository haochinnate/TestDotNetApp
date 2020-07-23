namespace TestDotNetApp.API.Models
{
    public class Like
    {
        // this should by User ID
        public int LikerId { get; set; }
        
        // this should by CarModel ID
        public int LikeeId { get; set; }

        public User Liker { get; set; }

        public CarModel Likee { get; set; }
    }
}