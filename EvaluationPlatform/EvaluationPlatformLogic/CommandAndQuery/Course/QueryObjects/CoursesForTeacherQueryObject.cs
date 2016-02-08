using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Course;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Course.QueryObjects
{
    public class CoursesForTeacherQueryObject : IQueryObject<IEnumerable<CourseViewInfo>>
    {
        public Guid TeacherId { get; set; }

        public CoursesForTeacherQueryObject(Guid teacherId)
        {
            this.TeacherId = teacherId;
        }

    }
}