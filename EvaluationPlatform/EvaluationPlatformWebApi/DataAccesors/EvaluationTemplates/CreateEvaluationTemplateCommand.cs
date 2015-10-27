using System;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation
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