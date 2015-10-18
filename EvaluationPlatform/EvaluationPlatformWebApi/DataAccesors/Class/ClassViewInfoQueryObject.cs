using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models;

namespace EvaluationPlatformWebApi.DataAccesors.Class
{
    public class ClassViewInfoQueryObject : IQueryObject<ClassInfo>
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
