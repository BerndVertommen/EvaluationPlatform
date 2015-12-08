using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Class.QueryObjects
{
    public class ClassesForTeacherQueryObject : IQueryObject<IEnumerable<ClassInfo>>
    {
        public Guid TeacherId { get; set; }

        public ClassesForTeacherQueryObject(Guid teacherId)
        {
            TeacherId = teacherId;
        }
    }
}