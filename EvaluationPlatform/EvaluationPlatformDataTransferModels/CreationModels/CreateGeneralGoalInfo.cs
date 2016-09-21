using System;

namespace EvaluationPlatformDataTransferModels.CreationModels
{
    public class CreateGeneralGoalInfo
    {
        public int GoalNumber { get; set; }
        public string Description { get; set; }
        public Guid StudyPlanId { get; set; }

        public CreateGeneralGoalInfo()
        {
            
        }
    }
}