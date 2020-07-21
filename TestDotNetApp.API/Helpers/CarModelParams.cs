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

        internal static int DefaultMinLength = 0;
        internal static int DefaultMaxLength = 6000;

        // the criteria of what we're going to filter by
        public int MinCarModelLength { get; set; } = DefaultMinLength;
        public int MaxCarModelLength { get; set; } = DefaultMaxLength;
        public int MinCarModelWidth { get; set; } = DefaultMinLength;
        public int MaxCarModelWidth { get; set; } = DefaultMaxLength;
        public int MinCarModelHeight { get; set; } = DefaultMinLength;
        public int MaxCarModelHeight { get; set; } = DefaultMaxLength;
        public string CarModelType { get; set; }

        public int MinBootCapacity { get; set; } = DefaultMinLength;
        public int MaxBootCapacity { get; set; } = DefaultMaxLength;

        public string OrderBy { get; set; }   
    }
}