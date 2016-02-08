using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Teacher;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Teacher.QueryObject
{
    public class TeachersQueryObject : IQueryObject<IEnumerable<TeacherInfo>>
    {
        public TeachersQueryObject()
        {
            
        }
    }
}