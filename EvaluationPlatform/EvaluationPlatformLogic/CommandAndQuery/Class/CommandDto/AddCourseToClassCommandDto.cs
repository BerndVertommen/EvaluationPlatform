using System;
using System.Collections.Generic;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Class.CommandDto
{
    public class AddCourseToClassCommandDto : ICommandDto
    {
        public Guid ClassId { get; set; }
        public IEnumerable<Guid> CourseIds { get; set; }

        public AddCourseToClassCommandDto(Guid classId, IEnumerable<Guid> courseIds)
        {
            ClassId = classId;
            CourseIds = courseIds;
        }
    }
}
