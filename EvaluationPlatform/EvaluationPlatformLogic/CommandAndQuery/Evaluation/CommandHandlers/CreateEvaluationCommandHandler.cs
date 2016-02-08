using System.Linq;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.Command;
using EvaluationPlatformLogic.Exeptions;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.CommandHandlers
{
    public class CreateEvaluationCommandHandler : CommandHandler<CreateEvaluationCommand>
    {
        public CreateEvaluationCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(CreateEvaluationCommand commandObject)
        {
            //check if the template is not already used
            if (Database.Evaluations.Any(e => e.EvaluationTemplate.Id == commandObject.EvaluationTemplateId && e.EvaluationDate == commandObject.EvaluationDate && e.Course.Id == commandObject.CourseId))
            {
                throw new BusinessExeption(BusinessExeption.EvaluationExitst);
            }

            var klas = Database.Classes.FirstOrDefault(c => c.Id == commandObject.ClassId);
            
            var evaluationTemplate =
                Database.EvaluationTemplates.FirstOrDefault(e => e.Id == commandObject.EvaluationTemplateId);
            var course = Database.Courses.FirstOrDefault(c => c.Id == evaluationTemplate.Course.Id);
            var teacher = Database.Teachers.FirstOrDefault(t => t.Id == commandObject.TeacherId.Value);

            teacher?.AddNewEvaluations(commandObject.Description, klas, evaluationTemplate,commandObject.EvaluationDate,course);
        }
    }
}