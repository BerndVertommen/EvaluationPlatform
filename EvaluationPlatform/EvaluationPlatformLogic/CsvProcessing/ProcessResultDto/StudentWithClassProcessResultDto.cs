using EvaluationPlatformDataTransferModels.InformationModels;

namespace EvaluationPlatformLogic.CsvProcessing.ProcessResultDto
{
    public class StudentWithClassProcessResultDto
    {
        public StudentInfo StudentInfo { get; set; }
        public string ClassCode { get; set; }

        public StudentWithClassProcessResultDto(StudentInfo studentInfo, string classCode)
        {
            StudentInfo = studentInfo;
            ClassCode = classCode;
        }
    }
}
