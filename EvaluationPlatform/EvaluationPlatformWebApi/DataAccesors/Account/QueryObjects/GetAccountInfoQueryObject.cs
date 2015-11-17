using System;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Account.QueryObjects
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