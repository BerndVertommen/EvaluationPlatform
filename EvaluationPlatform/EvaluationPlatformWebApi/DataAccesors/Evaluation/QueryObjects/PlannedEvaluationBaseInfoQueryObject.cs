using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.BaseInfoModels;
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