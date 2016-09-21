using System;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDAL;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.StudyPlan.CommandDto;

namespace EvaluationPlatformLogic.CommandAndQuery.StudyPlan.CommandHandlers
{
    public class AddGeneralGoalToStudyPlanCommandHandler : CommandHandler<AddGeneralGoalToStudyPlanCommandDto, GeneralGoalInfo>
    {
        public AddGeneralGoalToStudyPlanCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override GeneralGoalInfo Handle(AddGeneralGoalToStudyPlanCommandDto commandObject)
        {
            var studyPlan = Database.StudyPlans.FirstOrDefault(s => s.Id == commandObject.CreateGeneralGoalInfo.StudyPlanId);

            if (studyPlan == null)
            {
                throw new InvalidOperationException("Geen Leerplan gevonden. Het Leerplan doel kan niet worden toegevoegd.");
            }

            var newGoal = new GeneralGoal(commandObject.CreateGeneralGoalInfo.GoalNumber,
                commandObject.CreateGeneralGoalInfo.Description);

            studyPlan.AddGeneralGoal(newGoal);

            return Mapper.Map<GeneralGoalInfo>(newGoal);
        }
    }
}
