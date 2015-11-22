using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformWebApi.DataAccesors.Class.QueryObjects;

namespace EvaluationPlatformWebApi.DataAccesors.Class.QueryHandlers
{
    public class ClassesForCourseQueryHandler : QueryHandler<ClassesForCourseQueryObject,IEnumerable<ClassInfo>>
    {
        public ClassesForCourseQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<ClassInfo> Handle(ClassesForCourseQueryObject queryObject)
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