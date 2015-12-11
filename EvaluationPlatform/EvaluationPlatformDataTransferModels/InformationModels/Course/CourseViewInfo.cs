using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformDataTransferModels.InformationModels.Teacher;

namespace EvaluationPlatformDataTransferModels.InformationModels.Course
{
    public class CourseViewInfo
    {
        public Guid Id { get; set; }
        public SchoolYearInfo SchoolYear { get; set; }
        public string Description { get; set; }
        public PrimaryTeacherInfo PrimaryTeacher { get; set; }
        public IEnumerable<ClassBaseInfo> Classes { get; set; }



        // manualy map
        public IEnumerable<TeacherBaseInfo> CoTeachers { get; set; }

        public CourseViewInfo()
        {
            
        }

    }
}
