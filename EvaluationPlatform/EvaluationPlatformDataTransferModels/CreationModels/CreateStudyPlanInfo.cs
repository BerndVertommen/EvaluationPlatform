using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels;

namespace EvaluationPlatformDataTransferModels.CreationModels
{
    public class CreateStudyPlanInfo
    {
        public virtual string Description { get; set; }
        public virtual List<GeneralGoalInfo> GeneralGoals { get; set; }

    }
}