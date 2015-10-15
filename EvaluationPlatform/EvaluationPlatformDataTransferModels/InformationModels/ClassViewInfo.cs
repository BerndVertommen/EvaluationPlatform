﻿using System.Collections.Generic;

namespace EvaluationPlatformDataTransferModels.InformationModels
{
    public class ClassViewInfo
    {
        // git test 104
        public string Name { get; set; }
        public SchoolYearInfo SchoolYear { get; set; }
        public ICollection<StudentInfo> Students { get; set; }
    }
}
