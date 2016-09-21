using EvaluationPlatformDAL;

namespace EvaluationPlatformLogic.CommandAndQuery.BaseClasses
{
    public abstract class CommandHandler<TCommandDto>: ICommandHandler<TCommandDto> where TCommandDto : ICommandDto
    {
        protected readonly IEPDatabase Database;

        protected CommandHandler(IEPDatabase database)
        {
            Database = database;
        }

        public abstract void Handle(TCommandDto commandObject);

        public void SaveChanges()
        {
            var db = Database as EPDatabase;
            db.SaveChanges();
        }
    }

    public abstract class CommandHandler<TCommandDto, TResult> : ICommandHandler<TCommandDto, TResult> where TCommandDto : ICommandDto<TResult>
    {
        protected readonly IEPDatabase Database;

        protected CommandHandler(IEPDatabase database)
        {
            Database = database;
        }

        public abstract TResult Handle(TCommandDto commandObject);

        public void SaveChanges()
        {
            var db = Database as EPDatabase;
            db.SaveChanges();
        }
    }
}
