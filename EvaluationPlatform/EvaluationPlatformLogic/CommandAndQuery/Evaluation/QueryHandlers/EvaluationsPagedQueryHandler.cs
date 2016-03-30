using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.PagedQueryResults;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryDto;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryHandlers
{
    public class EvaluationsPagedQueryHandler : PagedQueryHandler<EvaluationsPagedQueryDto, IEnumerable<EvaluationInfo>, EvaluationPlatformDomain.Models.Evaluation>
    {
        public EvaluationsPagedQueryHandler(IEPDatabase database) : base(database)
        {
        }

       protected override IQueryable<EvaluationPlatformDomain.Models.Evaluation> GetEtities()
        {
            return Database.Evaluations.AsQueryable();
        }

        protected override IQueryable<EvaluationPlatformDomain.Models.Evaluation> Filter(IQueryable<EvaluationPlatformDomain.Models.Evaluation> entitiesToFilter, EvaluationsPagedQueryDto queryObject)
        {
            entitiesToFilter = SearchByDate(entitiesToFilter, queryObject);

            if (queryObject.Finished.HasValue)
            {
                entitiesToFilter = entitiesToFilter.Where(e => e.Finished == queryObject.Finished.Value);
            }
            if (queryObject.ClassId.HasValue)
            {
                entitiesToFilter = entitiesToFilter.Where(e => e.CreatedForClass.Id == queryObject.ClassId.Value);
            }
            if (queryObject.CourseId.HasValue)
            {
                entitiesToFilter = entitiesToFilter.Where(e => e.Course.Id == queryObject.CourseId.Value);
            }
            if (!string.IsNullOrWhiteSpace(queryObject.StudentFirstname))
            {
                entitiesToFilter = entitiesToFilter.Where(e => e.Student.Person.FirstName.Contains(queryObject.StudentFirstname));
            }
            if (!string.IsNullOrWhiteSpace(queryObject.StudentLastname))
            {
                entitiesToFilter = entitiesToFilter.Where(e => e.Student.Person.LastName.Contains(queryObject.StudentLastname));
            }

            return entitiesToFilter;
        }

        protected override IQueryable<EvaluationPlatformDomain.Models.Evaluation> Sort(IQueryable<EvaluationPlatformDomain.Models.Evaluation> entitiesToSort, EvaluationsPagedQueryDto queryObject)
        {
           return entitiesToSort.OrderBy(e => e.EvaluationDate);
        }

        protected override IEnumerable<EvaluationInfo> Map(IEnumerable<EvaluationPlatformDomain.Models.Evaluation> entitiesToMap)
        {
            return Mapper.Map<IEnumerable<EvaluationInfo>>(entitiesToMap);
        }

        private IQueryable<EvaluationPlatformDomain.Models.Evaluation> SearchByDate(IQueryable<EvaluationPlatformDomain.Models.Evaluation> evaluations, EvaluationsPagedQueryDto queryObject)
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