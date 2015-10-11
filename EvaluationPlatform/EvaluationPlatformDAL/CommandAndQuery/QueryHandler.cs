using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDAL.CommandAndQuery
{
    public abstract class QueryHandler<TQueryObject, TResult> : IQueryHandler<TQueryObject, TResult> where TQueryObject : IQueryObject<TResult>
    {
        private readonly IEPDatabase _database;

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
