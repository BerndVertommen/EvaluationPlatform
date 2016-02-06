using System;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Teacher.Command
{
    public class AddCourseToTeacherCommand : ICommandObject
    {
        public Guid TeacherId { get; set; }
        public Guid CourseId { get; set; }

        public AddCourseToTeacherCommand(Guid teacherId, Guid courseId)
        {
            TeacherId = teacherId;
            CourseId = courseId;
        }
    }
}