namespace EvaluationPlatformLogic.CommandAndQuery.BaseClasses
{
    public abstract class PagedQueryDto<T> : IQueryDto<T>
    {
        public int Page { get; set; }
        public int ItemCount { get; set; }
        public int TotalPages { get; set; }

        protected PagedQueryDto(int? page, int? itemCount)
        {
            Page =  page?? 1;
            ItemCount = itemCount?? 10;
        }


    }
}
