using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformDataTransferModels.InformationModels.Course;
using EvaluationPlatformDataTransferModels.InformationModels.EvaluationItem;

namespace EvaluationPlatformDataTransferModels.InformationModels.Evaluation
{
    public class EvaluationInfo
    {
        public Guid Id { get; set; }
        public StudentInfo Student { get; set; }
        public DateTime EvaluationDate { get; set; }
        public CourseInfo Course { get; set; }
        public ICollection<EvaluationItemInfo> EvaluationItems { get; set; }
        public string GeneralComment { get; set; }
        public ClassInfo CreatedForClass { get; set; }
        public bool Finished { get; set; }
        public EvaluationResultInfo Result { get; set; }
        public string Description { get; set; }

        public EvaluationInfo()
        {

        }
    }
}
