using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.StudyPlan;
using EvaluationPlatformDAL;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.StudyPlan.CommandDto;

namespace EvaluationPlatformLogic.CommandAndQuery.StudyPlan.CommandHandlers
{
    public class CreateStudyPlanCommandHandler : CommandHandler<CreateStudyPlanCommandDto,StudyPlanInfo>
    {
        public CreateStudyPlanCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override StudyPlanInfo Handle(CreateStudyPlanCommandDto commandObject)
        {
            if (string.IsNullOrEmpty(commandObject.CreateStudyPlanInfo.Description))
            {
                throw new InvalidOperationException("Geen omschrijving gevonden voor het aanmaken van een Leerplan.");
            }

            var newStudyplan =
                new EvaluationPlatformDomain.Models.StudyPlan(commandObject.CreateStudyPlanInfo.Description);

            if (commandObject.CreateStudyPlanInfo.GeneralGoals.Any())
            {
                commandObject.CreateStudyPlanInfo.GeneralGoals.ForEach(g => newStudyplan.AddGeneralGoal(new GeneralGoal(g.GoalNumber, g.Description)));
            }

            Database.StudyPlans.Add(newStudyplan);

            return Mapper.Map<StudyPlanInfo>(newStudyplan);
        }
    }
}
