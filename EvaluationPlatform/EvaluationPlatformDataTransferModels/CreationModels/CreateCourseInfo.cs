using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Teacher;

namespace EvaluationPlatformDataTransferModels.CreationModels
{
    public class CreateCourseInfo
    {
        public string Description { get; set; }
        public SchoolYearInfo SchoolYear { get; set; }
        public Guid TeacherID { get; set; }
        //public ScaleInfo Scale { get; set; } nog wel meegeven serverside zo ook studyplans

        //test branch


    }
}
