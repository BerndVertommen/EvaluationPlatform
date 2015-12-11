using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EvaluationPlatformDataTransferModels.InformationModels.Teacher;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Teacher.QueryObject
{
    public class TeachersQueryObject : IQueryObject<IEnumerable<TeacherInfo>>
    {
        public TeachersQueryObject()
        {
            
        }
    }
}