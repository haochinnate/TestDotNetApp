using System;

namespace TestDotNetApp.API.Models
{
    public class Message
    {
        public int Id { get; set; }
        
        public int SenderId { get; set; }
        public User Sender { get; set; }
        
        public int RecipientId { get; set; }
        public CarModel Recipient { get; set; }

        public string Content { get; set; }

        public bool IsRead { get; set; } // maybe nouse in my case
        public DateTime? DateRead { get; set; } // maybe nouse in my case
        public DateTime? MessageSent { get; set; }

        public bool SenderDeleted { get; set; }
        public bool RecipientDeleted { get; set; } // maybe nouse in my case
    }
}