﻿using System;
using System.Collections.Generic;

namespace EvaluationPlatformDataTransferModels.InformationModels.StudyPlan
{
    public class StudyPlanInfo
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public List<GeneralGoalInfo> GeneralGoals { get; set; }

        public StudyPlanInfo()
        {
            
        }
    }
}
