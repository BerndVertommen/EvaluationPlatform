using System;
using EvaluationPlatformDataTransferModels.InformationModels.Account;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Account.QueryDto
{
    public class GetAccountInfoQueryDto : IQueryObject<AccountInfo>
    {
        public Guid? AccountId { get; set; }

        public GetAccountInfoQueryDto(Guid? accountId)
        {
            AccountId = accountId;
        }
    }
}