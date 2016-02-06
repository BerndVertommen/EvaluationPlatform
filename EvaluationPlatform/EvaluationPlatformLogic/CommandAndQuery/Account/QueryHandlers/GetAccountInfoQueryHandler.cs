using System;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Account;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.Account.QueryObjects;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Account.QueryHandlers
{
    public class GetAccountInfoQueryHandler : QueryHandler<GetAccountInfoQueryObject,AccountInfo>
    {
        public GetAccountInfoQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override AccountInfo Handle(GetAccountInfoQueryObject queryObject)
        {
            var account = Database.Accounts.FirstOrDefault(a => a.Id == queryObject.AccountId);
            var accountInfo = Mapper.Map<EvaluationPlatformDomain.Models.Account.Account, AccountInfo>(account);

            var teacher = Database.Teachers.FirstOrDefault(t => t.Person.Id == account.Person.Id);
            accountInfo.TeacherId  = teacher?.Id ?? Guid.Empty;

            return accountInfo;

        }
    }
}