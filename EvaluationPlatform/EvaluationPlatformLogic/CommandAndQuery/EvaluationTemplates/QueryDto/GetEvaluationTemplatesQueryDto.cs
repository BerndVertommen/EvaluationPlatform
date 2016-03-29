using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.EvaluationTemplate;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.QueryDto
{
    public class GetEvaluationTemplatesQueryDto : IQueryObject<IEnumerable<EvaluationTemplateInfo>>
    {
        public Guid AccountId { get; set; }

        public GetEvaluationTemplatesQueryDto(Guid accountId)
        {
            AccountId = accountId;
        }
    }
}