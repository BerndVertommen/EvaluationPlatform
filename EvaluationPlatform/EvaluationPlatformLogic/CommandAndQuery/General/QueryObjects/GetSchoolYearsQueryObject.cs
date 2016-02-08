using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.General.QueryObjects
{
    public class GetSchoolYearsQueryObject : IQueryObject<IEnumerable<SchoolYearInfo>>
    {
        public GetSchoolYearsQueryObject()
        {
            
        }
    }
}