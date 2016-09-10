using System;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.CommandDto
{
    public class UpdateEvaluationItemsCommandDto : ICommandDto
    {
        public EvaluationInfo EvaluationInfo { get; set; }
        public Guid ExecutingAccountId { get; set; }

        public UpdateEvaluationItemsCommandDto(EvaluationInfo evaluationInfo, Guid executingAccountId)
        {
            EvaluationInfo = evaluationInfo;
            ExecutingAccountId = executingAccountId;
        }
    }
}