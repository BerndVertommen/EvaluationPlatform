using System;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Teacher.Command
{
    public class AddClassToTeacherCommand : ICommandObject
    {
        public Guid TeacherId { get; set; }
        public Guid ClassId { get; set; }

        public AddClassToTeacherCommand(Guid teacherId, Guid classId)
        {
            TeacherId = teacherId;
            ClassId = classId;
        }

    }
}