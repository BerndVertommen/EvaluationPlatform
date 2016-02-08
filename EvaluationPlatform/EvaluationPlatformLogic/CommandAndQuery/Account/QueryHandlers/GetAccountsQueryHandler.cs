using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Account;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.Account.QueryObjects;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Account.QueryHandlers
{
    public class GetAccountsQueryHandler : QueryHandler<GetAccountsQueryObject, List<AccountInfo>>
    {

        public GetAccountsQueryHandler(IEPDatabase database) : base(database)
        {

        }

        public override List<AccountInfo> Handle(GetAccountsQueryObject queryObject)
        {
            var accounts = Database.Accounts.ToList();

            return Mapper.Map<List<AccountInfo>>(accounts);

            
        }
    }
}
