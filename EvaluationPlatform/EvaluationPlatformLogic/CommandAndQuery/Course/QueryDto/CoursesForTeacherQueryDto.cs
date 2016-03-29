using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Course;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Course.QueryDto
{
    public class CoursesForTeacherQueryDto : IQueryObject<IEnumerable<CourseViewInfo>>
    {
        public Guid TeacherId { get; set; }

        public CoursesForTeacherQueryDto(Guid teacherId)
        {
            this.TeacherId = teacherId;
        }

    }
}