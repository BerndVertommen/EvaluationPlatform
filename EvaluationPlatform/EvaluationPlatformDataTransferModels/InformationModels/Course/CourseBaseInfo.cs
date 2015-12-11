using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Teacher;

namespace EvaluationPlatformDataTransferModels.InformationModels.Course
{
    public class CourseBaseInfo 
    {
        public Guid Id { get; set; }
        public SchoolYearInfo SchoolYear { get; set; }
        public string Description { get; set; }

        public CourseBaseInfo()
        {
            
        }

    }

}
