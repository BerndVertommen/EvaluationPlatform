using System.Collections.Generic;

namespace EvaluationPlatformDataTransferModels.InformationModels
{
    public class ClassInfo
    {
        // git test 105
        public string Discription { get; set; }
        public SchoolYearInfo SchoolYear { get; set; }
        public List<StudentInfo> Students { get; set; }

        public ClassInfo()
        {
            
        }
    }
}
