using System;
using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.QueryDto
{
    public class GetCreateEvaluationOptionsQueryDto : IQueryDto<CreateEvaluationOptions>
    {
        public Guid? AccountId { get; set; }

        public GetCreateEvaluationOptionsQueryDto(Guid? accountId)
        {
            AccountId = accountId;
        }
    }
}