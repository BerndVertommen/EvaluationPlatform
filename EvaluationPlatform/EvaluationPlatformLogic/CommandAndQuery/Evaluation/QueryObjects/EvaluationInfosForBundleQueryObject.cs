using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryObjects
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