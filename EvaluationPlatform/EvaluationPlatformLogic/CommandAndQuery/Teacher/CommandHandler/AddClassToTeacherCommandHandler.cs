﻿using System;
using System.Linq;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Teacher.CommandDto;

namespace EvaluationPlatformLogic.CommandAndQuery.Teacher.CommandHandler
{
    public class AddClassToTeacherCommandHandler : CommandHandler<AddClassToTeacherCommandDto>
    {
        public AddClassToTeacherCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(AddClassToTeacherCommandDto commandObject)
        {
            var klas = Database.Classes.FirstOrDefault(k => k.Id == commandObject.ClassId);

            if (klas == null)
            {
                throw new NullReferenceException("Class not found");
            }

            var teacher = Database.Teachers.FirstOrDefault(t => t.Id == commandObject.TeacherId);

            if (teacher == null)
            {
                throw new NullReferenceException("Teacher not found");
            }

            teacher.AddClass(klas);

        }
    }
}