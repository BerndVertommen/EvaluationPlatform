using System.Collections.Generic;
using EvaluationPlatformLogic.CsvProcessing.RecordMappings;
using FileHelpers;

namespace EvaluationPlatformLogic.CsvProcessing.Processors
{
    public abstract class BaseCsvProcessor<TRecordMapping, TOutputModel> :IRecordProcessor
        where TRecordMapping : BaseRecordMapping 
    {
        public IEnumerable<TOutputModel> Process(string fullFilePath)
        {
            var engine = new FileHelperEngine<TRecordMapping>();
            var output = new List<TOutputModel>();

            foreach (var studentRecord in engine.ReadFile(fullFilePath))
            {
                output.Add(MapToOutputModel(studentRecord));
            }

            return output;
        }

        protected abstract TOutputModel MapToOutputModel(TRecordMapping recordMapping);
    }
}
