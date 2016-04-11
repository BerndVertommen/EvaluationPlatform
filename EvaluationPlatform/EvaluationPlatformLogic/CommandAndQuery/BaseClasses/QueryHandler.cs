using EvaluationPlatformDAL;

namespace EvaluationPlatformLogic.CommandAndQuery.BaseClasses
{
    public abstract class QueryHandler<TQueryObject, TResult> : IQueryHandler<TQueryObject, TResult> where TQueryObject : IQueryDto<TResult>
    {
        protected readonly IEPDatabase _database;

        protected QueryHandler(IEPDatabase database)
        {
            _database = database;
        }

        protected IEPDatabase Database
        {
            get { return _database; }
        }

        public abstract TResult Handle(TQueryObject queryObject);
    }
}
