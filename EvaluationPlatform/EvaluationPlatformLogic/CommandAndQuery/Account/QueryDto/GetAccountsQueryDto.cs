using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Account;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Account.QueryDto
{
    public class GetAccountsQueryDto : IQueryDto<List<AccountInfo>>
    {
        public GetAccountsQueryDto()
        {

        }
    }
}
