using System.Collections.Generic;
using System.Linq;
using EvaluationPlatformDataTransferModels.InformationModels.EvaluationSubsection;
using EvaluationPlatformDAL;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.Command;

namespace EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.CommandHandlers
{
    public class CreateEvaluationTemplateCommandHandler: CommandHandler<CreateEvaluationTemplateCommand>
    {
        public CreateEvaluationTemplateCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(CreateEvaluationTemplateCommand command)
        {
            var teacher = Database.GetTeacherForAccount(command.AccountId);
            var templateInfo = command.EvaluationTemplateInfo;
            var course = Database.Courses.FirstOrDefault(c => c.Id == templateInfo.Course.Id);
            //List<Course> test = Database.Courses.Where(c => c.PrimaryTeacher.Id == course.PrimaryTeacher.Id).ToList();
            //opvragen uit database alle courses van deze primary teacher puur voor voorbeeld lambda expressie query
            var subsSections = new List<EvaluationSubSection>();

            foreach (EvaluationSubSectionInfo subSection in templateInfo.EvaluationSubSections)
            {
                var goals = GetGoalsForSubSection(subSection).ToList();
                subsSections.Add(new EvaluationSubSection( subSection.Description,
                                                            subSection.Weight,
                                                            goals));

            }

            var newEvaluationTemplate = new EvaluationTemplate(course,templateInfo.Description,subsSections);
            teacher.AddEvaluationTemplate(newEvaluationTemplate);

          
        }

        private IEnumerable<Goal> GetGoalsForSubSection(EvaluationSubSectionInfo subsection)
        {
            var goals = new List<Goal>();
            foreach (var subGoal in subsection.Goals)
            {
                goals.Add(Database.Goals.FirstOrDefault(g => g.Id == subGoal.Id)); 
            }
            
            return goals;
        } 
    }
}