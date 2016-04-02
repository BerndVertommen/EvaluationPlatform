using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.StudyPlan.QueryDto
{
    public class StudyPlanQueryDto : IQueryDto<IEnumerable<StudyPlanInfo>>
    {
        public StudyPlanQueryDto()
        {
            
        }
    }
}
