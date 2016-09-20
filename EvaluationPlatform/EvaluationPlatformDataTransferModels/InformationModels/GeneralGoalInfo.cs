using System;
using System.Collections.Generic;

namespace EvaluationPlatformDataTransferModels.InformationModels
{
    public class GeneralGoalInfo
    {
        public Guid Id { get; set; }
        public int GoalNumber { get; set; }
        public string Description { get; set; }
        public List<GoalInfo> Goals { get; set; }

        public GeneralGoalInfo()
        {
            
        }
    }
}