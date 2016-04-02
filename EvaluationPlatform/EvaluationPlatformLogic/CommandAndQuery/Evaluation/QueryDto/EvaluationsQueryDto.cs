using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryDto
{
    public class EvaluationsQueryDto: IQueryDto<IEnumerable<EvaluationInfo>>
    {
        public IEnumerable<Guid> Ids { get; set; }

        public EvaluationsQueryDto(IEnumerable<Guid> ids)
        {
            Ids = ids;
        }
    }
}