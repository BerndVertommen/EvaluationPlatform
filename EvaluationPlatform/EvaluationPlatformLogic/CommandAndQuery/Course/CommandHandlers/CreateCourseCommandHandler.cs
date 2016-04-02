using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Course.CommandDto;
using EvaluationPlatformLogic.Exeptions;

namespace EvaluationPlatformLogic.CommandAndQuery.Course.CommandHandlers
{
    public class CreateCourseCommandHandler : CommandHandler<CreateCourseCommandDto>
    {
        public CreateCourseCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(CreateCourseCommandDto commandObject)
        {
            int currentSchoolyear = EvaluationPlatformDomain.Models.SchoolYear.GetStartYearThisSchoolYear();

            // exceptie toegevoegd ofdat deze cursus dit jaar al is aangemaakt
            var course =
                Database.Courses.FirstOrDefault(c => c.Description == commandObject.CreateCourseInfo.Description && c.SchoolYear.StartYear == currentSchoolyear);
            if (course != null)
            {
                throw new BusinessExeption(BusinessExeption.CourseExists);
            }
            
            // Nieuwe cursus aanmaken
            EvaluationPlatformDomain.Models.Course newCourse = new EvaluationPlatformDomain.Models.Course();
            newCourse.Description = commandObject.CreateCourseInfo.Description;
            
            // huidig schooljaar ingeven 
            newCourse.SchoolYear = Database.GetCurrentSchoolyear();

            // scale ingeven (enige schaal de we gaan gebruiken)
            var scale = Database.Scales.FirstOrDefault();
            newCourse.Scale = scale;
            
            // nog geen studyplan
            var studyPlan = Database.StudyPlans.FirstOrDefault(s => s.Id == commandObject.CreateCourseInfo.StudyPlan.Id);
            if (studyPlan == null)
            {
                throw new BusinessExeption(BusinessExeption.NoStudyPlanSelected);
            }
            newCourse.StudyPlan = studyPlan;

            Database.Courses.Add(newCourse);





        }
    }
}
