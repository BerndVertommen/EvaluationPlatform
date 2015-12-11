using System;

namespace EvaluationPlatformDataTransferModels.InformationModels.Teacher
{
    public class PrimaryTeacherInfo
    {
        public Guid Id { get; set; }
        public PersonInfo Person { get; set; }

        public PrimaryTeacherInfo()
        {
            
        }
    }
}