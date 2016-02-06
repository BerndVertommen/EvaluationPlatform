namespace EvaluationPlatformLogic.CommandAndQuery.BaseClasses
{
    public interface ICommandHandler<TCommandObject>
    {
        void Handle(TCommandObject commandObject);

        void SaveChanges();

    }
}
