using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformDataTransferModels.InformationModels.Course;

namespace EvaluationPlatformDataTransferModels.InformationModels.Teacher
{
    public class TeacherInfo
    {
        public PersonInfo Person { get; protected set; }
        public List<ClassInfo> Classes { get; } = new List<ClassInfo>(); // c#6 auto initializers
        public List<CourseInfo> Courses { get; } = new List<CourseInfo>();

        public TeacherInfo()
        {
            
        }
    }
}