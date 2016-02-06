using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Class.QueryObjects
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