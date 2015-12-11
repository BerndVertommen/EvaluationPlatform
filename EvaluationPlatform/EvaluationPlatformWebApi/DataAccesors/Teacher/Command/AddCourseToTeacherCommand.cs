using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Teacher.Command
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