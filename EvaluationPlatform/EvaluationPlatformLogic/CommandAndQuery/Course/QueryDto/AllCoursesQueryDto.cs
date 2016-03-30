using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Course;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Course.QueryDto
{
    public class AllCoursesQueryDto : IQueryDto<IEnumerable<CourseBaseInfo>>
    {
        public int StartYear { get; set; }

        public AllCoursesQueryDto(int startYear)
        {
            StartYear = startYear;
        }
    }
}