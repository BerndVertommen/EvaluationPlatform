using System;
using FileHelpers;

namespace EvaluationPlatformLogic.CsvProcessing.RecordMappings.Student
{
    [DelimitedRecord(","), IgnoreFirst(1)]
    public class StudentWithClassRecordMapping : BaseRecordMapping
    {
        [FieldOrder(1)]
        public int ClassNumber;

        [FieldOrder(2)]
        public string Lastname;

        [FieldOrder(3)]
        public string Firstname;

        [FieldOrder(4), FieldConverter(ConverterKind.Date, "dd.MM.yyyy")]
        public DateTime Birthdate;

        [FieldOrder(5)]
        public string ClassCode;
    }
}
