using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryDto
{
    public class PlannedEvaluationBaseInfoQueryDto : IQueryObject<IEnumerable<EvaluationBaseInfo>>
    {
        public Guid AccountId { get; set; }

        public PlannedEvaluationBaseInfoQueryDto(Guid accountId)
        {
            AccountId = accountId;
        }
    }
}