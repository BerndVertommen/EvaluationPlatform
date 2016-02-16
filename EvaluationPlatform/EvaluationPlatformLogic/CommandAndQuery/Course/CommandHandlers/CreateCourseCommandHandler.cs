using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.Course.Commands;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.Exeptions;

namespace EvaluationPlatformLogic.CommandAndQuery.Course.CommandHandlers
{
    public class CreateCourseCommandHandler : CommandHandler<CreateCourseCommand>
    {
        public CreateCourseCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(CreateCourseCommand commandObject)
        {
            // exceptie toegevoegd ofdat deze cursus dit jaar al is aangemaakt
            // werkt niet nog nazien
            /*
            var course =
                Database.Courses.FirstOrDefault(c => c.Description == commandObject.CreateCourseInfo.Description && c.SchoolYear.StartYear == commandObject.CreateCourseInfo.SchoolYear.StartYear);
            if (course != null)
            {
                throw new BusinessExeption(BusinessExeption.CourseExists);
            }
            */



            // Nieuwe cursus aanmaken
            EvaluationPlatformDomain.Models.Course newCourse = new EvaluationPlatformDomain.Models.Course();
            newCourse.Description = commandObject.CreateCourseInfo.Description;
            
            // huidig schooljaar ingeven 
            int currentSchoolyear = 2015;
            newCourse.SchoolYear =
                Database.SchoolYears.FirstOrDefault(
                    x => x.StartYear == currentSchoolyear);


            //werkt niet
            /*

            // scale ophalen
            var scale = Database.Scales.First();

            newCourse.Scale = scale;

            // schooljaar nog juiste kiezen neemt voorlopig eerste
            var currentyear = Database.SchoolYears.First();

            newCourse.SchoolYear = currentyear;

            */


            // nog geen studyplan

            Database.Courses.Add(newCourse);





        }
    }
}
