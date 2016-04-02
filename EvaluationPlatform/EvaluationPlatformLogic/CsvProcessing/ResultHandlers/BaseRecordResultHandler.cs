using System.Collections.Generic;
using EvaluationPlatformDAL;

namespace EvaluationPlatformLogic.CsvProcessing.ResultHandlers
{
    public abstract class BaseRecordResultHandler<TInput, TRecordProcessor>
    {
        protected EPDatabase Database {  get; private set; }


        public BaseRecordResultHandler(EPDatabase database)
        {
            Database = database;
        }

        public abstract void Handle(IEnumerable<TInput> processedRecords);
    }
}
