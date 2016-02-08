using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.EvaluationTemplate;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates
{
    public class GetEvaluationTemplatesQueryObject : IQueryObject<IEnumerable<EvaluationTemplateInfo>>
    {
        public Guid AccountId { get; set; }

        public GetEvaluationTemplatesQueryObject(Guid accountId)
        {
            AccountId = accountId;
        }
    }
}