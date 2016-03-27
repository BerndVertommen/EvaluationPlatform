using EvaluationPlatformDomain.Models;
using EvaluationPlatformLogic.CsvProcessing.RecordMappings.Student;

namespace EvaluationPlatformLogic.CsvProcessing.Processors
{
    public class StudentCsvProcessor : BaseCsvProcessor<StudentRecordMapping, Student>
    {
        protected override Student MapToOutputModel(StudentRecordMapping recordMapping)
        {
            return new Student(
                new Person(recordMapping.Firstname,
                            recordMapping.Lastname,
                            recordMapping.Birthdate));
        }
    }
}
