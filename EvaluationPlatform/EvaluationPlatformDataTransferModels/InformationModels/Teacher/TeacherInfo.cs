using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformDataTransferModels.InformationModels.Course;

namespace EvaluationPlatformDataTransferModels.InformationModels.Teacher
{
    public class TeacherInfo
    {
        public Guid Id { get; set; }
        public PersonInfo Person { get; set; }
        public List<ClassInfo> Classes { get; set; } 
        public List<CourseInfo> Courses { get; set; } 

        public TeacherInfo()
        {
            
        }
    }
}