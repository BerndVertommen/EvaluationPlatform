using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDAL;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.StudyPlan.CommandDto;

namespace EvaluationPlatformLogic.CommandAndQuery.StudyPlan.CommandHandlers
{
    public class AddGeneralGoalToStudyPlanCommandHandler : CommandHandler<AddGeneralGoalToStudyPlanCommandDto>
    {
        public AddGeneralGoalToStudyPlanCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(AddGeneralGoalToStudyPlanCommandDto commandObject)
        {
            var studyPlan = Database.StudyPlans.FirstOrDefault(s => s.Id == commandObject.StudyPlanId);

            if (studyPlan == null)
            {
                throw new InvalidOperationException("Geen Leerplan gevonden. Het Leerplan doel kan niet worden toegevoegd.");
            }

            studyPlan.AddGeneralGoal(new GeneralGoal(commandObject.CreateGeneralGoalInfo.GoalNumber,commandObject.CreateGeneralGoalInfo.Description));
        }
    }
}
