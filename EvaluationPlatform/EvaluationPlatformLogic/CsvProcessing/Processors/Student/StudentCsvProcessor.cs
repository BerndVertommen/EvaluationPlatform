using EvaluationPlatformDomain.Models;
using EvaluationPlatformLogic.CsvProcessing.RecordMappings.Student;

namespace EvaluationPlatformLogic.CsvProcessing.Processors.Student
{
    public class StudentCsvProcessor : BaseCsvProcessor<StudentRecordMapping, EvaluationPlatformDomain.Models.Student>
    {
        protected override EvaluationPlatformDomain.Models.Student MapToOutputModel(StudentRecordMapping recordMapping)
        {
            return new EvaluationPlatformDomain.Models.Student(
                new Person(recordMapping.Firstname,
                            recordMapping.Lastname,
                            recordMapping.Birthdate));
        }
    }
}
