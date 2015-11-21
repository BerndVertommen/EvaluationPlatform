using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.General.QueryObjects
{
    public class GetSchoolYearsQueryObject : IQueryObject<IEnumerable<SchoolYearInfo>>
    {
        public GetSchoolYearsQueryObject()
        {
            
        }
    }
}