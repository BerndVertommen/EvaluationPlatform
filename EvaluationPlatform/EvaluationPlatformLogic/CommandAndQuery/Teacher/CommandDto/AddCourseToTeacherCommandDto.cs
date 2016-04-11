using System;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Teacher.CommandDto
{
    public class AddCourseToTeacherCommandDto : ICommandDto
    {
        public Guid TeacherId { get; set; }
        public Guid CourseId { get; set; }

        public AddCourseToTeacherCommandDto(Guid teacherId, Guid courseId)
        {
            TeacherId = teacherId;
            CourseId = courseId;
        }
    }
}