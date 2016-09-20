using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.StudyPlan.CommandDto
{
    public class CreateStudyPlanCommandDto : ICommandDto
    {
        public CreateStudyPlanInfo CreateStudyPlanInfo { get; set; }

        public CreateStudyPlanCommandDto(CreateStudyPlanInfo createStudyPlanInfo)
        {
            CreateStudyPlanInfo = createStudyPlanInfo;
        }
    }
}
