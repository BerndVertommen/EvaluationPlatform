using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Teacher;

namespace EvaluationPlatformDataTransferModels.CreationModels
{
    public class CreateEvaluationOptions
    {
        public TeacherInfo Teacher { get; set; }
        
        public CreateEvaluationOptions()
        {
            
        }
    }
}
