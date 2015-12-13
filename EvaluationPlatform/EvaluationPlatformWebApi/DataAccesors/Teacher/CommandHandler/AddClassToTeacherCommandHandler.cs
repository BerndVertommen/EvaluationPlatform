using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformWebApi.DataAccesors.Teacher.Command;

namespace EvaluationPlatformWebApi.DataAccesors.Teacher.CommandHandler
{
    public class AddClassToTeacherCommandHandler : CommandHandler<AddClassToTeacherCommand>
    {
        public AddClassToTeacherCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(AddClassToTeacherCommand commandObject)
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