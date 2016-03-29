using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryDto;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryHandlers
{
    public class EvaluationInfosForBundleQueryHandler : QueryHandler<EvaluationInfosForBundleQueryDto, IEnumerable<EvaluationInfo>>
    {
        public EvaluationInfosForBundleQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<EvaluationInfo> Handle(EvaluationInfosForBundleQueryDto queryObject)
        {
            var evaluations = Database.Evaluations.Where(e => e.BundleId == queryObject.BundleId);

            return Mapper.Map<IEnumerable<EvaluationInfo>>(evaluations);
        }
    }
}