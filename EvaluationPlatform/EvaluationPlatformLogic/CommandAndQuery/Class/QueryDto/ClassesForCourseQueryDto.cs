using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Class.QueryDto
{
    public class ClassesForCourseQueryDto : IQueryObject<IEnumerable<ClassInfo>>
    {
        public Guid CourseId { get; set; }

        public ClassesForCourseQueryDto(Guid courseId)
        {
            CourseId = courseId;
        }
    }
}