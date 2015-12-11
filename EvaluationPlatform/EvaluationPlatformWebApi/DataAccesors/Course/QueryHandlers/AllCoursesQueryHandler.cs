using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Course;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformWebApi.DataAccesors.Course.QueryObjects;

namespace EvaluationPlatformWebApi.DataAccesors.Course.QueryHandlers
{
    public class AllCoursesQueryHandler : QueryHandler<AllCoursesQueryObject, IEnumerable<CourseBaseInfo>>
    {
        public AllCoursesQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<CourseBaseInfo> Handle(AllCoursesQueryObject queryObject)
        {
            var courses = Database.Courses.Where(c => c.SchoolYear.StartYear == queryObject.StartYear).ToList();

            return Mapper.Map<IEnumerable<CourseBaseInfo>>(courses);
        }
    }
}