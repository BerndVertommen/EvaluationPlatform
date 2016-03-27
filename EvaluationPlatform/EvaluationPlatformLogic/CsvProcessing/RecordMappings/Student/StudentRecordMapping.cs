using System;
using FileHelpers;

namespace EvaluationPlatformLogic.CsvProcessing.RecordMappings.Student
{
    [DelimitedRecord(",")]
    public class StudentRecordMapping :BaseRecordMapping
    {
        public int ClassNumber;
        public string Firstname;
        public string Lastname;

        [FieldConverter(ConverterKind.Date, "dd-MM-yyyy")]
        public DateTime Birthdate;
    }
}
