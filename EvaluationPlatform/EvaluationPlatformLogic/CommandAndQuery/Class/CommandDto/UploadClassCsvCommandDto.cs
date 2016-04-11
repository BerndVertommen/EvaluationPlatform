using System;
using System.IO;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Class.CommandDto
{
    public class UploadClassCsvCommandDto : ICommandDto
    {
        public TextReader  TextReader { get; set; }
        public Guid SchoolYearId { get; set; }

        public UploadClassCsvCommandDto(TextReader textReader, Guid schoolYearId)
        {
            TextReader = textReader;
            SchoolYearId = schoolYearId;
        }
    }
}
