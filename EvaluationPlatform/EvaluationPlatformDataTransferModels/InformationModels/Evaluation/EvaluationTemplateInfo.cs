using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDataTransferModels.InformationModels.Evaluation
{
    public class EvaluationTemplateInfo
    {
        public Guid Id { get; set; }
        public  CourseInfo Course { get; set; }
        public string Description { get; set; }
        public List<EvaluationSubSectionInfo> EvaluationSubSections { get; set; }
    }
}
