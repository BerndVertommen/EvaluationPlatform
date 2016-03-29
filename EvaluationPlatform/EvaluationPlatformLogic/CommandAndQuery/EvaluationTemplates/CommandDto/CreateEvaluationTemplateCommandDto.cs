using System;
using EvaluationPlatformDataTransferModels.InformationModels.EvaluationTemplate;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.CommandDto
{
    public class CreateEvaluationTemplateCommandDto : ICommandDto
    {
        public EvaluationTemplateInfo EvaluationTemplateInfo { get; set; }
        public Guid? AccountId { get; set; }

        public CreateEvaluationTemplateCommandDto(EvaluationTemplateInfo evaluationTemplateInfo, Guid? accountId)
        {
            EvaluationTemplateInfo = evaluationTemplateInfo;
            AccountId = accountId;
        }
   } 
}