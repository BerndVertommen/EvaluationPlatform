using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.PagedQueryResults;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryObjects;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryHandlers
{
    public class EvaluationsPagedQueryHandler : PagedQueryHandler<EvaluationsPagedQueryObject, EvaluationsPagedQueryResult, EvaluationPlatformDomain.Models.Evaluation>
    {
        public EvaluationsPagedQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override EvaluationsPagedQueryResult Handle(EvaluationsPagedQueryObject queryObject)
        {
            IQueryable<EvaluationPlatformDomain.Models.Evaluation> evaluations = Database.Evaluations.AsQueryable();

            evaluations = SearchByDate(evaluations, queryObject);

            if (queryObject.Finished.HasValue)
            {
               evaluations =  evaluations.Where(e => e.Finished == queryObject.Finished.Value);
            }

            if (queryObject.ClassId.HasValue)
            {
                evaluations = evaluations.Where(e => e.CreatedForClass.Id == queryObject.ClassId.Value);
            }

            if (queryObject.CourseId.HasValue)
            {
                evaluations = evaluations.Where(e => e.Course.Id == queryObject.CourseId.Value);
            }


            int totalItems = evaluations.Count();
            var pagedEvaluations = PageResult(evaluations.OrderByDescending(e=> e.EvaluationDate), queryObject);
            var mappedEvaluations = Mapper.Map<IEnumerable<EvaluationInfo>>(pagedEvaluations);

            EvaluationsPagedQueryResult result = new EvaluationsPagedQueryResult(mappedEvaluations,totalItems);

            return result;
        }

        private IQueryable<EvaluationPlatformDomain.Models.Evaluation> SearchByDate(IQueryable<EvaluationPlatformDomain.Models.Evaluation> evaluations, EvaluationsPagedQueryObject queryObject)
        {
            if (queryObject.StartDate.HasValue)
            {
                evaluations = evaluations.Where(e => e.EvaluationDate >= queryObject.StartDate.Value);
            }

            if (queryObject.EndDate.HasValue)
            {
                evaluations = evaluations.Where(e => e.EvaluationDate >= queryObject.EndDate.Value);
            }

            return evaluations;
        }
    }
}