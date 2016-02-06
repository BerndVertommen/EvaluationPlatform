using EvaluationPlatformDAL;

namespace EvaluationPlatformLogic.CommandAndQuery.BaseClasses
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
