using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDAL.CommandAndQuery
{
    public abstract class CommandHandler<TCommandObject>: ICommandHandler<TCommandObject> where TCommandObject : ICommandObject
    {
        private readonly IEPDatabase _database;

        protected CommandHandler(IEPDatabase database)
        {
            _database = database;
        }

        public abstract void Handle(TCommandObject commandObject);
    }
}
