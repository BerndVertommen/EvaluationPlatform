using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformWebApi.DataAccesors.Evaluation.QueryObjects;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation.QueryHandlers
{
    public class EvaluationInfosForBundleQueryHandler : QueryHandler<EvaluationInfosForBundleQueryObject, IEnumerable<EvaluationInfo>>
    {
        public EvaluationInfosForBundleQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<EvaluationInfo> Handle(EvaluationInfosForBundleQueryObject queryObject)
        {
            var evaluations = Database.Evaluations.Where(e => e.BundleId == queryObject.BundleId);

            return AutoMapper.Mapper.Map<IEnumerable<EvaluationInfo>>(evaluations);
        }
    }
}