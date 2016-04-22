using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Course;
using EvaluationPlatformDataTransferModels.InformationModels.Teacher;

namespace EvaluationPlatformDataTransferModels.CreationModels
{
    public class CreateClassInfo
    {
        public string Description;
        public bool NextYear;
        public ICollection<CourseBaseInfo> Courses;

        public CreateClassInfo()
        {
                
        }

    }
}
