using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Class.QueryDto
{
    /// <summary>
    /// object to carry search parameters for a search on all available classes for a teacher.
    /// These are dependent on the courses the teacher has been assigned
    /// </summary>
    public class ClassesAvailableForTeacherQueryObject : IQueryObject<IEnumerable<ClassBaseInfo>>
    {
        public Guid TeacherId { get; set; }

        public ClassesAvailableForTeacherQueryObject(Guid teacherId)
        {
            TeacherId = teacherId;
        }
    }
}