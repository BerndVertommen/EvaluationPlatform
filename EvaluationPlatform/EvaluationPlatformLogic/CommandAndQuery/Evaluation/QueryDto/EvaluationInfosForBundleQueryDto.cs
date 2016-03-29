using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryDto
{
    public class EvaluationInfosForBundleQueryDto : IQueryObject<IEnumerable<EvaluationInfo>>
    {
        public Guid BundleId { get; set; }

        public EvaluationInfosForBundleQueryDto(Guid bundleId)
        {
            BundleId = bundleId;
        }
    }
}