using System;
using System.Collections.Generic;
using System.Linq;
using EvaluationPlatformDAL;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformDomain.Models.BaseEntities;

namespace EvaluationPlatformLogic.CommandAndQuery.BaseClasses
{
    public abstract class PagedQueryHandler<TQueryDto, TResult, TEntity> : QueryHandler<TQueryDto, TResult> 
        where TResult : PagedQueryResult
        where TQueryDto : PagedQueryDto<TResult>
        where TEntity : Entity
    {
        protected int totalItemCount;

        public bool IgnorePage { get; set; }
        public PagedQueryHandler(IEPDatabase database) : base(database)
        {
        }

        /// <summary>
        /// Call the PageResult method in the overridden handle method.
        /// Then map to the appropriate return type.
        /// </summary>
        /// <param name="queryObject">Parameter that inherits forPageQueryObject</param>
        /// <returns></returns>
        public override TResult Handle(TQueryDto queryObject)
        {
            var entities = GetEtities();
            var entitiesToSort = Filter(entities, queryObject);
            var entitiesToPage = Sort(entitiesToSort, queryObject);
            var pagedResult = PageResult(entitiesToPage, queryObject);

            return Map(pagedResult);
        }

        protected abstract IQueryable<TEntity> GetEtities();
        protected abstract IQueryable<TEntity> Filter(IQueryable<TEntity> entitiesToFilter, TQueryDto queryObject);
        protected abstract IQueryable<TEntity> Sort(IQueryable<TEntity> entitiesToSort, TQueryDto queryObject);
        protected abstract TResult Map(IEnumerable<TEntity> entitiesToMap);

        protected IEnumerable<TEntity> PageResult(IQueryable<TEntity> queryResultToPage, TQueryDto queryObject)
        {
            if (!IgnorePage)
            {
                totalItemCount = queryResultToPage.Count();

                queryResultToPage = queryResultToPage.Skip((queryObject.Page - 1) * queryObject.ItemCount);
                queryResultToPage = queryResultToPage.Take(queryObject.ItemCount);
            }

            return queryResultToPage.ToList();
        }

    }
}
