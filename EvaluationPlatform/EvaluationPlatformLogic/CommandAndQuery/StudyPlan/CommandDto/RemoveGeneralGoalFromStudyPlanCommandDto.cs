using System;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.StudyPlan.CommandDto
{
    public class RemoveGeneralGoalFromStudyPlanCommandDto : ICommandDto
    {
        public Guid GeneralGoalId { get; set; }

        public RemoveGeneralGoalFromStudyPlanCommandDto(Guid generalGoalId)
        {
            GeneralGoalId = generalGoalId;
        }
    }
}
