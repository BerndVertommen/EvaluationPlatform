using System;
using System.Collections.Generic;

namespace EvaluationPlatformDataTransferModels.InformationModels
{
    public class ClassInfo
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public SchoolYearInfo SchoolYear { get; set; }
        public List<StudentInfo> Students { get; set; }

        public ClassInfo()
        {
            
        }
    }
}
