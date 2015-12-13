using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Windows.Input;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Teacher.Command
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