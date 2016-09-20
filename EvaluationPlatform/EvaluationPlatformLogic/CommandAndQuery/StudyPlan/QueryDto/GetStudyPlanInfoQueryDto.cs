using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDataTransferModels.InformationModels.StudyPlan;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.StudyPlan.QueryDto
{
    public class GetStudyPlanInfoQueryDto : IQueryDto<StudyPlanInfo>
    {
        public Guid StudyPlanId { get; set; }

        public GetStudyPlanInfoQueryDto(Guid studyPlanId)
        {
            StudyPlanId = studyPlanId;
        }
    }
}
