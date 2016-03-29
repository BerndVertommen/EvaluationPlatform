using System;
using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.QueryDto
{
    public class GetCreateEvaluationOptionsQueryDto : IQueryObject<CreateEvaluationOptions>
    {
        public Guid? AccountId { get; set; }

        public GetCreateEvaluationOptionsQueryDto(Guid? accountId)
        {
            AccountId = accountId;
        }
    }
}