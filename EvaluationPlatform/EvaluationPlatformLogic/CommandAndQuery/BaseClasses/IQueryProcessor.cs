namespace EvaluationPlatformLogic.CommandAndQuery.BaseClasses
{
    public interface IQueryProccesor
    {
        TResult Execute<TResult>(IQueryObject<TResult> query);
    }
}
