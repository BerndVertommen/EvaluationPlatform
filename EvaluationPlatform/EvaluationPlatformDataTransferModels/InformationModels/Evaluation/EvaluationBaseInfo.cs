using System;
using EvaluationPlatformDataTransferModels.InformationModels.Course;

namespace EvaluationPlatformDataTransferModels.InformationModels.Evaluation
{
    public class EvaluationBaseInfo
    {
        public DateTime EvaluationDate { get; set; }
        public CourseBaseInfo Course { get; set; }
        public string Description { get; set; }
        public Guid BundleId { get; set; }


        public EvaluationBaseInfo()
        {
            
        }
    }
}
