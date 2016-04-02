using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformLogic.CsvProcessing.ProcessResultDto;
using EvaluationPlatformLogic.CsvProcessing.RecordMappings.Student;

namespace EvaluationPlatformLogic.CsvProcessing.Processors.Student
{
    public class StudentWithClassCsvProcessor : BaseCsvProcessor<StudentWithClassRecordMapping, StudentWithClassProcessResultDto>
    {
        protected override StudentWithClassProcessResultDto MapToOutputModel(StudentWithClassRecordMapping recordMapping)
        {
            var person = new PersonInfo()
            {
                BirthDate = recordMapping.Birthdate,
                FirstName = recordMapping.Firstname,
                LastName = recordMapping.Lastname
            };
            var student = new StudentInfo() {Person = person};

            return new StudentWithClassProcessResultDto(student,recordMapping.ClassCode );
        }
    }
}
