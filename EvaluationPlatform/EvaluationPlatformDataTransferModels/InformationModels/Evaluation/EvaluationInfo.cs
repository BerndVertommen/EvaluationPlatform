using System;
using System.Collections.Generic;

namespace EvaluationPlatformDataTransferModels.InformationModels.Evaluation
{
    public class EvaluationInfo
    {
        public StudentInfo Student { get; set; }
        public DateTime EvaluationDate { get; set; }
        public CourseInfo Cource { get; set; }
        public ICollection<EvaluationItemInfo> EvaluationItems { get; set; }
        public string GeneralComment { get; set; }

        public EvaluationInfo()
        {

        }
    }
}
