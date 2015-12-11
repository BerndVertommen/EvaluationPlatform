using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EvaluationPlatformDataTransferModels.InformationModels.Course;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Course.QueryObjects
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