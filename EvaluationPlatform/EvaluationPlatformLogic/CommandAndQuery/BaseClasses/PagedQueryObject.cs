namespace EvaluationPlatformLogic.CommandAndQuery.BaseClasses
{
    public abstract class PagedQueryObject<T> : IQueryObject<T>
    {
        public int Page { get; set; }
        public int ItemCount { get; set; }
        public int TotalPages { get; set; }

        protected PagedQueryObject(int? page, int? itemCount)
        {
            Page =  page?? 1;
            ItemCount = itemCount?? 10;
        }


    }
}
