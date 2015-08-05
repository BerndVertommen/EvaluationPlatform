using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformWebApi.Models;

namespace EvaluationPlatformWebApi.DataAccesors.Class
{
    public class ClassViewInfoQueryObject : IQueryObject<ClassViewInfo>
    {
        public string ClassName { get; set; }
        public SchoolYear SchoolYear { get; set; }

        public ClassViewInfoQueryObject(string className, SchoolYear schoolYear)
        {
            ClassName = className;
            SchoolYear = schoolYear;
        }
    }
}
