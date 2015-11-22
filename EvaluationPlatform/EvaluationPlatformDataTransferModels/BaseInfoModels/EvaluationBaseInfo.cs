using System;
using EvaluationPlatformDataTransferModels.InformationModels;

namespace EvaluationPlatformDataTransferModels.BaseInfoModels
{
    public class EvaluationBaseInfo
    {
        public DateTime EvaluationDate { get; set; }
        public CourseInfo Course { get; set; }
        public string Discription { get; set; }

        public EvaluationBaseInfo()
        {
            
        }
    }
}
