using System;
using EvaluationPlatformDataTransferModels.InformationModels.EvaluationTemplate;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.Command
{
    public class CreateEvaluationTemplateCommand : ICommandObject
    {
        public EvaluationTemplateInfo EvaluationTemplateInfo { get; set; }
        public Guid? AccountId { get; set; }

        public CreateEvaluationTemplateCommand(EvaluationTemplateInfo evaluationTemplateInfo, Guid? accountId)
        {
            EvaluationTemplateInfo = evaluationTemplateInfo;
            AccountId = accountId;
        }
   } 
}