using System;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.CommandDto
{
    public class CreateEvaluationCommandDto : ICommandDto
    {
        public Guid EvaluationTemplateId { get; set; }
        public Guid? TeacherId { get; set; }
        public DateTime EvaluationDate { get; set; }
        public Guid ClassId { get; set; }
        public Guid CourseId { get; set; }
        public string Description { get; set; }


        public CreateEvaluationCommandDto()
        {

        }

        public CreateEvaluationCommandDto(Guid schoolYearId, Guid evaluationTemplateId, Guid teacherId, DateTime evaluationDate, Guid classId, Guid courseId, string description)
        {
            EvaluationTemplateId = evaluationTemplateId;
            TeacherId = teacherId;
            EvaluationDate = evaluationDate;
            ClassId = classId;
            CourseId = courseId;
            Description = description;
        }
    }
}
