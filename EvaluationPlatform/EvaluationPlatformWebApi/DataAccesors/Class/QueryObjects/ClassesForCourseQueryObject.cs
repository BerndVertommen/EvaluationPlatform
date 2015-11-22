using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Class.QueryObjects
{
    public class ClassesForCourseQueryObject : IQueryObject<IEnumerable<ClassInfo>>
    {
        public Guid CourseId { get; set; }

        public ClassesForCourseQueryObject(Guid courseId)
        {
            CourseId = courseId;
        }
    }
}