using System;
using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.StudyPlan.CommandDto
{
    public class AddGeneralGoalToStudyPlanCommandDto : ICommandDto<GeneralGoalInfo>
    {
        public CreateGeneralGoalInfo CreateGeneralGoalInfo { get; set; }

        public AddGeneralGoalToStudyPlanCommandDto( CreateGeneralGoalInfo createGeneralGoalInfo)
        {
            CreateGeneralGoalInfo = createGeneralGoalInfo;
        }
    }
}
