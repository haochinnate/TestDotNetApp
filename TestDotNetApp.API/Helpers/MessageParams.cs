namespace TestDotNetApp.API.Helpers
{
    public class MessageParams
    {
         public int PageNumber { get; set; } = 1;
        
        #region PageSize
        private const int MaxPageSize = 50;
        
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        #endregion   

        public int UserId { get; set; }

        public string MessageContainer { get; set; } = "Unread";

        // new added for my case
        public int CarModelId { get; set; }
    }
}