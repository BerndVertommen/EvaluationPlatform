using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.EvaluationTemplate;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.CommandDto
{
    public class HideEvaluationTemplatesCommandDto : ICommandDto
    {
        public IEnumerable<EvaluationTemplateInfo> EvaluationInfos { get; set; }

        public HideEvaluationTemplatesCommandDto(IEnumerable<EvaluationTemplateInfo> evaluationInfos)
        {
            EvaluationInfos = evaluationInfos;
        }
    }
}
