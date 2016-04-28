using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.DataTransferModels;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryDto;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryHandlers
{
    public class EvaluationTotalsForClassOverviewQueryHandler : QueryHandler<EvaluationTotalsForClassOverviewQueryDto, IEnumerable<EvaluationTotalsForClassOverview>>
    {
        public EvaluationTotalsForClassOverviewQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<EvaluationTotalsForClassOverview> Handle(EvaluationTotalsForClassOverviewQueryDto queryObject)
        {
            var entities = Database.Evaluations.AsQueryable();
            var filteredResult = Filter(entities, queryObject);

            return Map(filteredResult);

        }

        protected IQueryable<EvaluationPlatformDomain.Models.Evaluation> Filter(IQueryable<EvaluationPlatformDomain.Models.Evaluation> entitiesToFilter, EvaluationTotalsForClassOverviewQueryDto queryObject)
        {

            if (!queryObject.ClassId.HasValue)
            {
                throw new NullReferenceException("Geen klas id opgegeven");
            }
            if (!queryObject.ClassId.HasValue)
            {
                throw new NullReferenceException("Geen vak id opgegeven");
            }

            entitiesToFilter = entitiesToFilter.Where(e => e.Finished && e.CreatedForClass.Id == queryObject.ClassId.Value);

            entitiesToFilter = SearchByDate(entitiesToFilter, queryObject);

            if (!string.IsNullOrWhiteSpace(queryObject.Description))
            {
                entitiesToFilter =
                    entitiesToFilter.Where(
                        e => e.Description.Contains(queryObject.Description));
            }

            return entitiesToFilter;
        }

        protected IEnumerable<EvaluationTotalsForClassOverview> Map(IEnumerable<EvaluationPlatformDomain.Models.Evaluation> entitiesToMap)
        {
            List<EvaluationTotalsForClassOverview> evaluationsForClassOverviews = new List<EvaluationTotalsForClassOverview>();

            IEnumerable<IGrouping<Guid, EvaluationPlatformDomain.Models.Evaluation>> groupedOverview = entitiesToMap.GroupBy(e => e.BundleId).OrderBy(g => g.FirstOrDefault().EvaluationDate);
            foreach (var grouped in groupedOverview)
            {
                evaluationsForClassOverviews.Add(new EvaluationTotalsForClassOverview()
                {
                    BundleId = grouped.FirstOrDefault().BundleId,
                    EvalutionSummaries = Mapper.Map<IEnumerable<EvaluationSummaryInfo>>(grouped),
                    CreatedForClass = Mapper.Map<ClassInfo>(grouped.FirstOrDefault().CreatedForClass),
                    Description = grouped.FirstOrDefault().Description,
                    EvaluationDate = grouped.FirstOrDefault().EvaluationDate
                });
            }

            return evaluationsForClassOverviews;
        }

        private IQueryable<EvaluationPlatformDomain.Models.Evaluation> SearchByDate(IQueryable<EvaluationPlatformDomain.Models.Evaluation> evaluations, EvaluationTotalsForClassOverviewQueryDto queryObject)
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
