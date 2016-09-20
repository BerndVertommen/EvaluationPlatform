using System;
using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.StudyPlan.CommandDto
{
    public class AddGeneralGoalToStudyPlanCommandDto : ICommandDto
    {
        public Guid StudyPlanId { get; set; }
        public CreateGeneralGoalInfo CreateGeneralGoalInfo { get; set; }

        public AddGeneralGoalToStudyPlanCommandDto(Guid studyPlanId, CreateGeneralGoalInfo createGeneralGoalInfo)
        {
            StudyPlanId = studyPlanId;
            CreateGeneralGoalInfo = createGeneralGoalInfo;
        }
    }
}
