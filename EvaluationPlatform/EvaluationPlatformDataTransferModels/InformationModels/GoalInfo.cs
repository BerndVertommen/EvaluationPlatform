using System;

namespace EvaluationPlatformDataTransferModels.InformationModels
{
    public class GoalInfo
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string Groupname { get; set; }

        // retrieved with automapper. Check Mappingconfiguration
        public int GeneralGoalNumber { get; set; }

        public GoalInfo()
        {
            
        }
    }
}