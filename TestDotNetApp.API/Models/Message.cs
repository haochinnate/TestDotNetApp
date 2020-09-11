namespace TestDotNetApp.API.Models
{
    public class Message
    {
        public int Id { get; set; }
        
        public int SenderId { get; set; }
        public User Sender { get; set; }
        
        public int RecipientId { get; set; }
        public CarModel Recipient { get; set; }
    }
}