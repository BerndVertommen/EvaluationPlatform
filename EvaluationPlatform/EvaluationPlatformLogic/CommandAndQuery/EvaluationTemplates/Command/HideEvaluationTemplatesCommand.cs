using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.EvaluationTemplate;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.Command
{
    public class HideEvaluationTemplatesCommand : ICommandObject
    {
        public IEnumerable<EvaluationTemplateInfo> EvaluationInfos { get; set; }

        public HideEvaluationTemplatesCommand(IEnumerable<EvaluationTemplateInfo> evaluationInfos)
        {
            EvaluationInfos = evaluationInfos;
        }
    }
}
