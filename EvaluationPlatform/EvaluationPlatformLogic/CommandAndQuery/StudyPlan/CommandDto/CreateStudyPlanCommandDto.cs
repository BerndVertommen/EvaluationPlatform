using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformDataTransferModels.InformationModels.StudyPlan;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.StudyPlan.CommandDto
{
    public class CreateStudyPlanCommandDto : ICommandDto<StudyPlanInfo>
    {
        public CreateStudyPlanInfo CreateStudyPlanInfo { get; set; }

        public CreateStudyPlanCommandDto(CreateStudyPlanInfo createStudyPlanInfo)
        {
            CreateStudyPlanInfo = createStudyPlanInfo;
        }
    }
}
