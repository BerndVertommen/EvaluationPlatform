using System;
using System.Collections.Generic;

namespace EvaluationPlatformDataTransferModels.InformationModels.Evaluation
{
    public class EvaluationResultInfo
    {
        public decimal Total { get; set; }
        public Dictionary<Guid, decimal> TotalsPercategory { get; set; }
        public StudentInfo Student { get; set; }
        public DateTime EvaluationDate { get; set; }
    }
}