using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Course.CommandDto
{
    public class CreateCourseCommandDto : ICommandDto
    {
        public CreateCourseInfo CreateCourseInfo { get; set; }

        public CreateCourseCommandDto(CreateCourseInfo createCourseInfo)
        {
            CreateCourseInfo = createCourseInfo;
        }
    }
}
