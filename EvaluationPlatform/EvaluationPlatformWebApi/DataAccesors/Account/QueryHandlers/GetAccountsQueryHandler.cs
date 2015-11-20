using AutoMapper;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformWebApi.DataAccesors.Account.QueryObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDataTransferModels.InformationModels.Account;

namespace EvaluationPlatformWebApi.DataAccesors.Account.QueryHandlers
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
