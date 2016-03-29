using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformLogic.CommandAndQuery.Class.QueryDto;

namespace EvaluationPlatformLogic.CommandAndQuery.Class.QueryHandlers
{
    public class ClassesForCourseQueryHandler : QueryHandler<ClassesForCourseQueryDto,IEnumerable<ClassInfo>>
    {
        public ClassesForCourseQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<ClassInfo> Handle(ClassesForCourseQueryDto queryObject)
        {
            var thisYear = SchoolYear.GetStartYearThisSchoolYear();
            var classes =
                Database.Classes.Where(
                    c =>
                        c.Courses.Any(
                            crs =>
                                crs.Id == queryObject.CourseId &&
                                c.SchoolYear.StartYear == thisYear));

            return Mapper.Map<IEnumerable<ClassInfo>>(classes.ToList());
        }
    }
}