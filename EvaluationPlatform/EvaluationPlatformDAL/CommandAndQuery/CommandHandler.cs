using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDAL.CommandAndQuery
{
    public abstract class CommandHandler<TCommandObject>: ICommandHandler<TCommandObject> where TCommandObject : ICommandObject
    {
        protected readonly IEPDatabase _database;

        protected CommandHandler(IEPDatabase database)
        {
            _database = database;
        }

        public abstract void Handle(TCommandObject commandObject);

        public void SaveChanges()
        {
            var db = _database as EPDatabase;
            db.SaveChanges();
        }
    }
}
