using System.Collections.Generic;
using System.Linq;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformWebApi.DataAccesors.Evaluation.Command;
using EvaluationPlatformWebApi.Exeptions;
using EvaluationPlatformDomain.Models;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation.CommandHandlers
{
    public class CreateEvaluationCommandHandler : CommandHandler<CreateEvaluationCommand>
    {
        public CreateEvaluationCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(CreateEvaluationCommand commandObject)
        {
            //check if the template is not already used
            if (Database.Evaluations.Any(e => e.EvaluationTemplate.Id == commandObject.EvaluationTemplateId && e.EvaluationDate == commandObject.EvaluationDate && e.Cource.Id == commandObject.CourseId))
            {
                throw new BusinessExeption(BusinessExeption.EvaluationExitst);
            }

            var klas = Database.Classes.FirstOrDefault(c => c.Id == commandObject.ClassId);
            
            var evaluationTemplate =
                Database.EvaluationTemplates.FirstOrDefault(e => e.Id == commandObject.EvaluationTemplateId);
            var course = Database.Courses.FirstOrDefault(c => c.Id == evaluationTemplate.Course.Id);
            var teacher = Database.Teachers.FirstOrDefault(t => t.Id == commandObject.TeacherId.Value);


            foreach (var student in klas.Students)
            {
                List<EvaluationItem> evaluationItems = new List<EvaluationItem>();
                foreach (var subsection in evaluationTemplate.EvaluationSubSections)
                {
                    foreach (Goal goal in subsection.Goals)
                    {
                        evaluationItems.Add(new EvaluationItem(goal));
                    }
                }

                teacher.AddEvaluation(new EvaluationPlatformDomain.Models.Evaluation(evaluationTemplate, student, commandObject.EvaluationDate, course, evaluationItems, ""));
            }

        }
    }
}