using System;
using System.Reflection.Emit;

namespace EvaluationPlatformDataTransferModels.InformationModels
{
    public class SchoolYearInfo
    {
        public int StartYear { get; set; }
        public int EndYear { get; set; }

        public string Notation => $"{StartYear} - {EndYear}";
        public Guid Id { get; set; }

        public SchoolYearInfo()
        {
            
        }

    }
}