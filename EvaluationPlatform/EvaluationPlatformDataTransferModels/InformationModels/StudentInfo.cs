using System;

namespace EvaluationPlatformDataTransferModels.InformationModels
{
    public class StudentInfo
    {
        public Guid Id { get; set; }
        public PersonInfo Person { get; set; }

        public StudentInfo()
        {
            
        }
    }
}