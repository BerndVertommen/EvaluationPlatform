using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Class.QueryDto
{
    public class AllClassesDto : IQueryDto<IEnumerable<ClassInfo>>
    {
        public int StartYear;

        public AllClassesDto(int startyear)
        {
            StartYear = startyear;
        }
    }
}
