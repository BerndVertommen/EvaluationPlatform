using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Class.QueryObjects
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