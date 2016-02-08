using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Course;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Course.QueryObjects;

namespace EvaluationPlatformLogic.CommandAndQuery.Course.QueryHandlers
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