using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.StudyPlan;
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
