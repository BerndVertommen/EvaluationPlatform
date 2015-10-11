using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Account
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