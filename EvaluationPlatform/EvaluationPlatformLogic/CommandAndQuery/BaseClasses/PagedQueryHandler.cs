using System;
using System.Collections.Generic;
using System.Linq;
using EvaluationPlatformDAL;
using EvaluationPlatformDomain.Models;

namespace EvaluationPlatformLogic.CommandAndQuery.BaseClasses
{
    public class PagedQueryHandler<TQueryObject, TResult, TEntity> : QueryHandler<TQueryObject, TResult> where TResult : PagedQueryResult
        where TQueryObject : PagedQueryObject<TResult>
        where TEntity : Entity
    {
        public PagedQueryHandler(IEPDatabase database) : base(database)
        {
        }

        /// <summary>
        /// Call the PageResult method in the overridden handle method.
        /// Then map to the appropriate return type.
        /// </summary>
        /// <param name="queryObject">Parameter that inherits forPageQueryObject</param>
        /// <returns></returns>
        public override TResult Handle(TQueryObject queryObject)
        {
            throw new NotImplementedException();
        }

        protected IEnumerable<TEntity> PageResult(IQueryable<TEntity> queryResultToPage, TQueryObject queryObject)
        {
            queryResultToPage = queryResultToPage.Skip((queryObject.Page - 1) * queryObject.ItemCount);
            queryResultToPage = queryResultToPage.Take(queryObject.ItemCount);


            return queryResultToPage.ToList();
        }

    }
}
