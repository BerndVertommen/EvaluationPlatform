using System.Collections.Generic;

namespace EvaluationPlatformDataTransferModels.InformationModels
{
    public class ClassViewInfo
    {
        // git test 105
        public string Discription { get; set; }
        public SchoolYearInfo SchoolYear { get; set; }
        public ICollection<StudentInfo> Students { get; set; }
    }
}
