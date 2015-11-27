using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation.QueryObjects
{
    public class EvaluationInfosForBundleQueryObject : IQueryObject<IEnumerable<EvaluationInfo>>
    {
        public Guid BundleId { get; set; }

        public EvaluationInfosForBundleQueryObject(Guid bundleId)
        {
            BundleId = bundleId;
        }
    }
}