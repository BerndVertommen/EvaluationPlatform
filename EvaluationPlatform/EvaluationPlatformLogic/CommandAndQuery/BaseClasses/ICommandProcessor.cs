namespace EvaluationPlatformLogic.CommandAndQuery.BaseClasses
{
    public interface ICommandProcessor
    {
        void Execute(ICommandObject command);

    }
}
