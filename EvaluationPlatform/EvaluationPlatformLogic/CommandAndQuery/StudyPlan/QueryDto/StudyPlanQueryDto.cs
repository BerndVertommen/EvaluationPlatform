using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.StudyPlan.QueryDto
{
    public class StudyPlanQueryDto : IQueryObject<IEnumerable<StudyPlanInfo>>
    {
        public StudyPlanQueryDto()
        {
            
        }
    }
}
