using System;

namespace EvaluationPlatformDataTransferModels.InformationModels
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