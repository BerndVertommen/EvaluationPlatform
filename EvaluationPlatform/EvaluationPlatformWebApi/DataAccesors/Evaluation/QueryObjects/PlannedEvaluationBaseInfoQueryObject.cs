using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation.QueryObjects
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