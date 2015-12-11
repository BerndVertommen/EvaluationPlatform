using System;

namespace EvaluationPlatformDataTransferModels.InformationModels.Teacher
{
    public class TeacherBaseInfo
    {
        public Guid Id { get; set; }
        public PersonInfo Person { get; protected set; }

        public TeacherBaseInfo()
        {
            
        }
    }
}
