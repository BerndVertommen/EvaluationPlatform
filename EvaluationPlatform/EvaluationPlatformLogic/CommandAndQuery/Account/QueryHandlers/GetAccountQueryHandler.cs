using System.Linq;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.Account.QueryObjects;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;


namespace EvaluationPlatformLogic.CommandAndQuery.Account.QueryHandlers
{
    public class GetAccountQueryHandler : QueryHandler<GetAccountQueryObject, EvaluationPlatformDomain.Models.Account.Account>
    {
        public GetAccountQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override EvaluationPlatformDomain.Models.Account.Account Handle(GetAccountQueryObject queryObject)
        {
            return _database.Accounts.FirstOrDefault(a => a.Username == queryObject.Username);
        }
    }
}