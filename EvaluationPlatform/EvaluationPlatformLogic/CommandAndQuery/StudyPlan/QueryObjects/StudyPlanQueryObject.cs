using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.StudyPlan.QueryObjects
{
    public class StudyPlanQueryObject : IQueryObject<IEnumerable<StudyPlanInfo>>
    {
        public StudyPlanQueryObject()
        {
            
        }
    }
}
