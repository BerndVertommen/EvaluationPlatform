using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Class.QueryDto
{
    public class ClassesForCourseQueryDto : IQueryDto<IEnumerable<ClassInfo>>
    {
        public Guid CourseId { get; set; }

        public ClassesForCourseQueryDto(Guid courseId)
        {
            CourseId = courseId;
        }
    }
}