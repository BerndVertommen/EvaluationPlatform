using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Course;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Course.QueryObjects
{
    public class AllCoursesQueryObject : IQueryObject<IEnumerable<CourseBaseInfo>>
    {
        public int StartYear { get; set; }

        public AllCoursesQueryObject(int startYear)
        {
            StartYear = startYear;
        }
    }
}