using System;
using System.Collections.Generic;
using System.Linq;
using EvaluationPlatformDAL;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Class.CommandDto;
using EvaluationPlatformLogic.Exeptions;

namespace EvaluationPlatformLogic.CommandAndQuery.Class.CommandHandlers
{
    public class CreateClassCommandHandler : CommandHandler<CreateClassCommandDto>
    {
        public CreateClassCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(CreateClassCommandDto commandObject)
        {

            int selectedSchoolYearStartYear = CheckSchoolYear(commandObject);
            //exceptie bestaat deze klas al?
            var classX =
            Database.Classes.FirstOrDefault(c =>
                c.Description.Equals(commandObject.CreateClassInfo.Description, StringComparison.CurrentCultureIgnoreCase) &&
                c.SchoolYear.StartYear == selectedSchoolYearStartYear);
            if (classX != null)
            {
                throw new BusinessExeption(BusinessExeption.ClassExists);
            }

            IEnumerable<Guid> courseIds = commandObject.CreateClassInfo.Courses.Select(c => c.Id);

            var courses =
              Database.Courses.Where(c => courseIds.Any(dto => dto == c.Id )).ToList();

            var schoolyear = Database.SchoolYears.FirstOrDefault(s => s.StartYear == selectedSchoolYearStartYear);
            var description = commandObject.CreateClassInfo.Description;

            // nieuwe klas aanmaken
            EvaluationPlatformDomain.Models.Class newClass = new EvaluationPlatformDomain.Models.Class(schoolyear, description, courses);

            // klas aanmaken
            Database.Classes.Add(newClass);
        }

        public int CheckSchoolYear(CreateClassCommandDto commandObject)
        {
            //schooljaar check
            int selectedSchoolYearStartYear = SchoolYear.GetStartYearThisSchoolYear();

            if (commandObject.CreateClassInfo.NextYear)
            {
                selectedSchoolYearStartYear += 1;

                var checkSchoolYear =
                Database.SchoolYears.FirstOrDefault(s => s.StartYear == selectedSchoolYearStartYear);

                if (checkSchoolYear == null)
                {
                    SchoolYear newSchoolYear = new SchoolYear(selectedSchoolYearStartYear, selectedSchoolYearStartYear + 1);
                    Database.SchoolYears.Add(newSchoolYear);
                }
            }

            return selectedSchoolYearStartYear;

        }
    }
}
