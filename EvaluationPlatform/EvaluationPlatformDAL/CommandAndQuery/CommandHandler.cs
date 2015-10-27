using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDAL.CommandAndQuery
{
    public abstract class CommandHandler<TCommandObject>: ICommandHandler<TCommandObject> where TCommandObject : ICommandObject
    {
        protected readonly IEPDatabase Database;

        protected CommandHandler(IEPDatabase database)
        {
            Database = database;
        }

        public abstract void Handle(TCommandObject commandObject);

        public void SaveChanges()
        {
            var db = Database as EPDatabase;
            db.SaveChanges();
        }
    }
}
