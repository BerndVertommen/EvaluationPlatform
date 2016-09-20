using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDataTransferModels.InformationModels.StudyPlan
{
    public class StudyPlanSummaryInfo
    {
        public Guid Id { get; set; }
        public string Description { get; set; }

        public StudyPlanSummaryInfo()
        {
            
        }
    }
}
