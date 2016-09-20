using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.StudyPlan.CommandDto;

namespace EvaluationPlatformLogic.CommandAndQuery.StudyPlan.CommandHandlers
{
    public class RemoveGeneralGoalFromStudyPlanCommandHandler : CommandHandler<RemoveGeneralGoalFromStudyPlanCommandDto>
    {
        public RemoveGeneralGoalFromStudyPlanCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(RemoveGeneralGoalFromStudyPlanCommandDto commandObject)
        {
            var studyplan =
                Database.StudyPlans.FirstOrDefault(s => s.GeneralGoals.Any(g => g.Id == commandObject.GeneralGoalId));

            studyplan?.RemoveGeneralGoal(commandObject.GeneralGoalId);
        }
    }
}
