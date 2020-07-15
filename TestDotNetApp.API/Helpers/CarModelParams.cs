namespace TestDotNetApp.API.Helpers
{
    public class CarModelParams
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

        // the criteria of what we're going to filter by
        public int CarModelLength { get; set; }
        public int CarModelWidth { get; set; }
        public int CarModelHeight { get; set; }
        public string CarModelType { get; set; }
    }
}