using System.Linq;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformWebApi.DataAccesors.Account.QueryObjects;

namespace EvaluationPlatformWebApi.DataAccesors.Account.QueryHandlers
{
    public class GetAccountQueryHandler : QueryHandler<GetAccountQueryObject, EvaluationPlatformDomain.Models.Account.Account>
    {
        public GetAccountQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override EvaluationPlatformDomain.Models.Account.Account Handle(GetAccountQueryObject queryObject)
        {
            return Database.Accounts.FirstOrDefault(a => a.Username == queryObject.Username);
        }
    }
}