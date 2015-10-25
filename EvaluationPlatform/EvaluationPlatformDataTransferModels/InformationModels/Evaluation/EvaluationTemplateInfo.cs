using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDataTransferModels.InformationModels.Evaluation
{
    public class EvaluationTemplateInfo
    {
        public  CourseInfo Course { get; set; }
        public string Discription { get; set; }
        public List<EvaluationSubSectionInfo> EvaluationSubSections { get; set; }
    }

    public class EvaluationSubSectionInfo
    {
        public string Discription { get; set; }
        public int Weight { get; set; }
        public List<GoalInfo> Goals{ get; set; }
    }
}
