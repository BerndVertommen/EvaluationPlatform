using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EvaluationPlatformDAL;
using EvaluationPlatformWebApi.DataAccesors.Teacher.Command;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Teacher.CommandHandler
{
    public class AddCourseToTeacherCommandHandler : CommandHandler<AddCourseToTeacherCommand>
    {
        public AddCourseToTeacherCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(AddCourseToTeacherCommand commandObject)
        {
            var teacher = Database.Teachers.FirstOrDefault(t => t.Id == commandObject.TeacherId);

            if (teacher == null)
            {
                throw  new NullReferenceException("Teacher not found");
            }

            var course = Database.Courses.FirstOrDefault(t => t.Id == commandObject.CourseId);

            if (course == null)
            {
                throw  new NullReferenceException("course not foud");
            }

            teacher.AddCourse(course);

        }
    }
}