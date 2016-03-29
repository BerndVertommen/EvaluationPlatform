using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.CommandDto
{
    public class UpdateEvaluationItemsCommandDto : ICommandDto
    {
        public EvaluationInfo EvaluationInfo { get; set; }

        public UpdateEvaluationItemsCommandDto(EvaluationInfo evaluationInfo)
        {
            EvaluationInfo = evaluationInfo;
        }
    }
}