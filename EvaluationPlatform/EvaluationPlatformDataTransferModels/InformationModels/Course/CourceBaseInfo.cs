using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Teacher;

namespace EvaluationPlatformDataTransferModels.InformationModels.Course
{
    public class CourceBaseInfo 
    {
        public Guid Id { get; set; }
        public SchoolYearInfo SchoolYear { get; set; }
        public string Description { get; set; }

        public CourceBaseInfo()
        {
            
        }

    }

}
