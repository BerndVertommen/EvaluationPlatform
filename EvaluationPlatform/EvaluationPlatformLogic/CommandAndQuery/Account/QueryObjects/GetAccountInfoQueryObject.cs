using System;
using EvaluationPlatformDataTransferModels.InformationModels.Account;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Account.QueryObjects
{
    public class GetAccountInfoQueryObject : IQueryObject<AccountInfo>
    {
        public Guid? AccountId { get; set; }

        public GetAccountInfoQueryObject(Guid? accountId)
        {
            AccountId = accountId;
        }
    }
}