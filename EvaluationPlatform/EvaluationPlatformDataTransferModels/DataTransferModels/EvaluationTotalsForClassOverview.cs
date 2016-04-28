using System;
using System.Collections.Generic;
using System.Security.AccessControl;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;

namespace EvaluationPlatformDataTransferModels.DataTransferModels
{
    public class EvaluationTotalsForClassOverview
    {
        public Guid BundleId { get; set; }
        public IEnumerable<EvaluationSummaryInfo> EvalutionSummaries { get; set; }
        public ClassInfo CreatedForClass { get; set; }
        public string Description { get; set; }
        public DateTime EvaluationDate { get; set; }
    }
}
