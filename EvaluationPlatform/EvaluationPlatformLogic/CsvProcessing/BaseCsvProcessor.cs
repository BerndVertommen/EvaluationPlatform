using System.Collections.Generic;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformLogic.CsvProcessing.RecordMappings;
using FileHelpers;

namespace EvaluationPlatformLogic.CsvProcessing
{
    public abstract class BaseCsvProcessor<TRecordMapping, TOutputModel> 
        where TRecordMapping : BaseRecordMapping
        where TOutputModel : Entity
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
