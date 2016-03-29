using System;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Teacher.CommandDto
{
    public class AddClassToTeacherCommandDto : ICommandDto
    {
        public Guid TeacherId { get; set; }
        public Guid ClassId { get; set; }

        public AddClassToTeacherCommandDto(Guid teacherId, Guid classId)
        {
            TeacherId = teacherId;
            ClassId = classId;
        }

    }
}