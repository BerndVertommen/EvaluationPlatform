using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Course;
using EvaluationPlatformDataTransferModels.InformationModels.EvaluationSubsection;

namespace EvaluationPlatformDataTransferModels.InformationModels.EvaluationTemplate
{
    public class EvaluationTemplateInfo
    {
        public Guid Id { get; set; }
        public  CourseInfo Course { get; set; }
        public string Description { get; set; }
        public List<EvaluationSubSectionInfo> EvaluationSubSections { get; set; }
    }
}
