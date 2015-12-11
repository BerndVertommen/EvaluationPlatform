using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDataTransferModels.InformationModels.EvaluationTemplate;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.EvaluationTemplates
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