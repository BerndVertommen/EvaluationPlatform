using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Class.CommandDto;

namespace EvaluationPlatformLogic.CommandAndQuery.Class.CommandHandlers
{
    public class AddCourseToClassCommandHandler : CommandHandler<AddCourseToClassCommandDto>
    {
        public AddCourseToClassCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(AddCourseToClassCommandDto commandObject)
        {
            var klas = Database.Classes.FirstOrDefault(k => k.Id == commandObject.ClassId);
            var courses = Database.Courses.Where(c => commandObject.CourseIds.Any(cId => cId == c.Id)).ToList();

            try
            {
                foreach (var course in courses)
                {
                    klas.AddCourse(course);
                }
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
         
        }
    }
}
