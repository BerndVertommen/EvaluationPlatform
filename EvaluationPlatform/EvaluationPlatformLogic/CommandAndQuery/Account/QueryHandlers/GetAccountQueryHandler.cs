using System.Linq;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.Account.QueryDto;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;


namespace EvaluationPlatformLogic.CommandAndQuery.Account.QueryHandlers
{
    public class GetAccountQueryHandler : QueryHandler<GetAccountQueryDto, EvaluationPlatformDomain.Models.Account.Account>
    {
        public GetAccountQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override EvaluationPlatformDomain.Models.Account.Account Handle(GetAccountQueryDto queryObject)
        {
            return _database.Accounts.FirstOrDefault(a => a.Username == queryObject.Username);
        }
    }
}