using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Account;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Account.QueryObjects
{
    public class GetAccountsQueryObject : IQueryObject<List<AccountInfo>>
    {
        public GetAccountsQueryObject()
        {

        }
    }
}
