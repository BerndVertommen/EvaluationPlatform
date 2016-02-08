using System;
using Autofac;

namespace EvaluationPlatformLogic.CommandAndQuery.BaseClasses
{
    public class QueryProcessor : IQueryProccesor
    {
        private readonly ILifetimeScope _lifetimeScope;

        public QueryProcessor(ILifetimeScope lifetimeScope)
        {
            _lifetimeScope = lifetimeScope;
        }

        public virtual TResult Execute<TResult>(IQueryObject<TResult> query)
        {
            return GetQueryHandler(query).Handle((dynamic)query);
        }

        protected dynamic GetQueryHandler<TResult>(IQueryObject<TResult> query)
        {
            Type queryHandlerImplementationType = typeof(IQueryHandler<,>).MakeGenericType(query.GetType(), typeof(TResult));
            dynamic queryHandler = _lifetimeScope.Resolve(queryHandlerImplementationType);
            return queryHandler;
        }
    }
}
