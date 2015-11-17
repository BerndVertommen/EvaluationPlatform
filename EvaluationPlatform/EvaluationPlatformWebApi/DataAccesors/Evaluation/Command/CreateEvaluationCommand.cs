using System;
using System.Windows.Input;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation.Command
{
    public class CreateEvaluationCommand : ICommandObject
    {
        public Guid SchoolYearId { get; set; }
        public Guid EvaluationTemplateId { get; set; }
        public Guid? TeacherId { get; set; }
        public DateTime EvaluationDate { get; set; }
        public Guid ClassId { get; set; }
        public Guid CourseId { get; set; }

        public CreateEvaluationCommand()
        {
            
        }

        public CreateEvaluationCommand(Guid schoolYearId, Guid evaluationTemplateId, Guid teacherId, DateTime evaluationDate, Guid classId, Guid courseId)
        {
            SchoolYearId = schoolYearId;
            EvaluationTemplateId = evaluationTemplateId;
            TeacherId = teacherId;
            EvaluationDate = evaluationDate;
            ClassId = classId;
            CourseId = courseId;
        }
    }
}
