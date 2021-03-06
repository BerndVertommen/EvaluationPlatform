﻿using System;
using System.Linq;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Teacher.CommandDto;

namespace EvaluationPlatformLogic.CommandAndQuery.Teacher.CommandHandler
{
    public class AddCourseToTeacherCommandHandler : CommandHandler<AddCourseToTeacherCommandDto>
    {
        public AddCourseToTeacherCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(AddCourseToTeacherCommandDto commandObject)
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