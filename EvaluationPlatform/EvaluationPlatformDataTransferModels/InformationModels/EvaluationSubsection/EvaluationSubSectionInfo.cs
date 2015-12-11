using System;
using System.Collections.Generic;

namespace EvaluationPlatformDataTransferModels.InformationModels.EvaluationSubsection
{
    public class EvaluationSubSectionInfo
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public int Weight { get; set; }
        public List<GoalInfo> Goals{ get; set; }
    }
}