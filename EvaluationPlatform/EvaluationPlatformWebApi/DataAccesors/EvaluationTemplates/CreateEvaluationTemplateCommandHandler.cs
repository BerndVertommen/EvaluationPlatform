using System.Collections.Generic;
using System.Linq;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation
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
            var subsSections = new List<EvaluationSubSection>();

            foreach (EvaluationSubSectionInfo subSection in templateInfo.EvaluationSubSections)
            {
                var goals = GetGoalsForSubSection(subSection).ToList();
                subsSections.Add(new EvaluationSubSection( subSection.Discription,
                                                            subSection.Weight,
                                                            goals));

            }

            var newEvaluationTemplate = new EvaluationTemplate(course,templateInfo.Discription,subsSections);
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