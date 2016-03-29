using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Teacher;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Teacher.QueryDto
{
    public class TeachersQueryDto : IQueryObject<IEnumerable<TeacherInfo>>
    {
        public TeachersQueryDto()
        {
            
        }
    }
}