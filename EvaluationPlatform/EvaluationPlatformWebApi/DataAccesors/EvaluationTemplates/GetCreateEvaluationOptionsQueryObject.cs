using System;
using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation
{
    public class GetCreateEvaluationOptionsQueryObject : IQueryObject<CreateEvaluationOptions>
    {
        public Guid? AccountId { get; set; }

        public GetCreateEvaluationOptionsQueryObject(Guid? accountId)
        {
            AccountId = accountId;
        }
    }
}