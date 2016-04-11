using System;
using System.Linq;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Class.CommandDto;
using EvaluationPlatformLogic.CsvProcessing.Processors.Student;
using EvaluationPlatformLogic.CsvProcessing.ResultHandlers.Student;

namespace EvaluationPlatformLogic.CommandAndQuery.Class.CommandHandlers
{
    public class UploadClassCsvCommandHandler : CommandHandler<UploadClassCsvCommandDto>
    {
        public UploadClassCsvCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(UploadClassCsvCommandDto commandObject)
        {
            var schoolYear = Database.SchoolYears.FirstOrDefault(s => s.Id == commandObject.SchoolYearId);

            StudentWithClassCsvProcessor processor = new StudentWithClassCsvProcessor();
            var processResult = processor.Process(commandObject.TextReader);

            StudentWithClassResultHandler handler = new StudentWithClassResultHandler(Database, schoolYear);
            handler.Handle(processResult);
        }
    }
}
