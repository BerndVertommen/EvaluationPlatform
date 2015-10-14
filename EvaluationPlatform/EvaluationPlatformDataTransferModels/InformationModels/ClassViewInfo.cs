using System.Collections.Generic;

namespace EvaluationPlatformDataTransferModels.InformationModels
{
    public class ClassViewInfo
    {
        public string Name { get; set; }
        public SchoolYearInfo SchoolYear { get; set; }
        public ICollection<StudentInfo> Students { get; set; }
    }
}
