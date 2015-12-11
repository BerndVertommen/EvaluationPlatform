using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Teacher;

namespace EvaluationPlatformDataTransferModels.InformationModels.Course
{
    public class CourseInfo
    {
        public Guid Id { get; set; }
        public SchoolYearInfo SchoolYear { get; set; }
        public PrimaryTeacherInfo PrimaryTeacher { get; set; }// leerkracht die het vak initieel geeft (niet de vervanger)
        public ScaleInfo Scale { get; set; }
        public string Description { get; set; }
        public List<GoalInfo> GoalsForCourse { get; set; }
        
        public CourseInfo()
        {
            
        }
    }
}