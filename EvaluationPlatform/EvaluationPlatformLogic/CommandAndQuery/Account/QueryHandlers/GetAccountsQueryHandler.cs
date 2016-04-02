using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Account;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.Account.QueryDto;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Account.QueryHandlers
{
    public class GetAccountsQueryHandler : QueryHandler<GetAccountsQueryDto, List<AccountInfo>>
    {

        public GetAccountsQueryHandler(IEPDatabase database) : base(database)
        {

        }

        public override List<AccountInfo> Handle(GetAccountsQueryDto queryObject)
        {
            var accounts = Database.Accounts.ToList();

            return Mapper.Map<List<AccountInfo>>(accounts);

            
        }
    }
}
