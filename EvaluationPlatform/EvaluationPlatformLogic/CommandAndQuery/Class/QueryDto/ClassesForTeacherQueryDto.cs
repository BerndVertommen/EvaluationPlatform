using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Class.QueryDto
{
    public class ClassesForTeacherQueryDto : IQueryObject<IEnumerable<ClassInfo>>
    {
        public Guid TeacherId { get; set; }

        public ClassesForTeacherQueryDto(Guid teacherId)
        {
            TeacherId = teacherId;
        }
    }
}