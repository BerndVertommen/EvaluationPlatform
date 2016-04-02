namespace EvaluationPlatformLogic.CommandAndQuery.BaseClasses
{
    public interface IQueryHandler<in TQuery, TResult> where TQuery : IQueryDto<TResult>
    {
        TResult Handle(TQuery query);
    }
}
