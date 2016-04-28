using System;

namespace EvaluationPlatformDataTransferModels.InformationModels.Evaluation

{
    public class EvaluationSummaryInfo
    {
        public Guid Id { get; set; }
        public EvaluationResultInfo Result { get; set; }
        public string Description { get; set; }
        public string GeneralComment { get; set; }
        public StudentInfo Student { get; set; }

        public EvaluationSummaryInfo()
        {
            
        }
    }
}
