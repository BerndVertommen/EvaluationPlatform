using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDataTransferModels.CreationModels;
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
            //schooljaar check
            int currentSchoolYearStartYear = EvaluationPlatformDomain.Models.SchoolYear.GetStartYearThisSchoolYear();

            if (commandObject.CreateClassInfo.NextYear)
            {
                currentSchoolYearStartYear += 1; 

                var checkSchoolYear =
                Database.SchoolYears.FirstOrDefault(s => s.StartYear == currentSchoolYearStartYear);

                if (checkSchoolYear == null)
                {
                    EvaluationPlatformDomain.Models.SchoolYear newSchoolYear = new SchoolYear(currentSchoolYearStartYear, currentSchoolYearStartYear +1);
                    Database.SchoolYears.Add(newSchoolYear);
                }
                
            }
            
            //exceptie bestaat deze klas al?
            var classX =
            Database.Classes.FirstOrDefault(c =>
                c.Description == commandObject.CreateClassInfo.Description &&
                c.SchoolYear.StartYear == currentSchoolYearStartYear);
            if (classX != null)
            {
                throw new BusinessExeption(BusinessExeption.ClassExists);
            }

            // nieuwe klas aanmaken
            EvaluationPlatformDomain.Models.Class newClass = new EvaluationPlatformDomain.Models.Class();
            newClass.Description = commandObject.CreateClassInfo.Description;
            newClass.SchoolYear =
                Database.SchoolYears.FirstOrDefault(
                    s => s.StartYear == currentSchoolYearStartYear);

            // klas aanmaken
            Database.Classes.Add(newClass);



        }
    }
}
