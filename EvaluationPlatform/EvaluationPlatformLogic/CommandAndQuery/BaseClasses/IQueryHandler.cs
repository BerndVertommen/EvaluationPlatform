namespace EvaluationPlatformLogic.CommandAndQuery.BaseClasses
{
    public interface IQueryHandler<in TQuery, TResult> where TQuery : IQueryObject<TResult>
    {
        TResult Handle(TQuery query);
    }
}
