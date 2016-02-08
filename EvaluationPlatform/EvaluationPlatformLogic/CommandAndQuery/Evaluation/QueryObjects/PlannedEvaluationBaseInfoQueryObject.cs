using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryObjects
{
    public class PlannedEvaluationBaseInfoQueryObject : IQueryObject<IEnumerable<EvaluationBaseInfo>>
    {
        public Guid AccountId { get; set; }

        public PlannedEvaluationBaseInfoQueryObject(Guid accountId)
        {
            AccountId = accountId;
        }
    }
}