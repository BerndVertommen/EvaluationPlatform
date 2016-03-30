namespace EvaluationPlatformLogic.CommandAndQuery.BaseClasses
{
    public interface IQueryProccesor
    {
        TResult Execute<TResult>(IQueryDto<TResult> query);
    }
}
