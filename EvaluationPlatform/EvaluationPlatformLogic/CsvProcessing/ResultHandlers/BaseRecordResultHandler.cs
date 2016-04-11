using System.Collections.Generic;
using EvaluationPlatformDAL;

namespace EvaluationPlatformLogic.CsvProcessing.ResultHandlers
{
    public abstract class BaseRecordResultHandler<TInput, TRecordProcessor>
    {
        protected IEPDatabase Database {  get; private set; }


        public BaseRecordResultHandler(IEPDatabase database)
        {
            Database = database;
        }

        public abstract void Handle(IEnumerable<TInput> processedRecords);
    }
}
