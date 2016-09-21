namespace EvaluationPlatformLogic.CommandAndQuery.BaseClasses
{
    public interface ICommandHandler<TCommandObject>
    {
        void Handle(TCommandObject commandObject);

        void SaveChanges();

    }

    public interface ICommandHandler<TCommandObject, TResult>
    {
        TResult Handle(TCommandObject commandObject);

        void SaveChanges();

    }
}
