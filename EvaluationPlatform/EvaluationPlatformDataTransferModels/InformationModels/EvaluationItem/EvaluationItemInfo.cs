using System;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDataTransferModels.InformationModels.EvaluationSubsection;

namespace EvaluationPlatformDataTransferModels.InformationModels.EvaluationItem
{
    public class EvaluationItemInfo
    {
        public Guid Id { get; set; }

        public EvaluationSubSectionInfo EvaluationSubSection { get; set; }

        public GoalInfo Goal { get; set; }

        public int? Score { get; set; }

        public string Comment { get; set; }

        public virtual int NotScoredReason { get; set; }

    }
}
