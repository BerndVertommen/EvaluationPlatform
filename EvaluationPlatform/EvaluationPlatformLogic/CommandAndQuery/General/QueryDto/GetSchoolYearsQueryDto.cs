using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.General.QueryDto
{
    public class GetSchoolYearsQueryDto : IQueryDto<IEnumerable<SchoolYearInfo>>
    {
        public GetSchoolYearsQueryDto()
        {
            
        }
    }
}