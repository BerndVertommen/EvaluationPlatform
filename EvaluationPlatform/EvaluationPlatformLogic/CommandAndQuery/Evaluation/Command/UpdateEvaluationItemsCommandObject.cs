using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.Command
{
    public class UpdateEvaluationItemsCommandObject : ICommandObject
    {
        public EvaluationInfo EvaluationInfo { get; set; }

        public UpdateEvaluationItemsCommandObject(EvaluationInfo evaluationInfo)
        {
            EvaluationInfo = evaluationInfo;
        }
    }
}