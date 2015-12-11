using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Course;
using EvaluationPlatformDataTransferModels.InformationModels.Teacher;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Course.QueryObjects
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