using System;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Account;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.Account.QueryDto;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Account.QueryHandlers
{
    public class GetAccountInfoQueryHandler : QueryHandler<GetAccountInfoQueryDto,AccountInfo>
    {
        public GetAccountInfoQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override AccountInfo Handle(GetAccountInfoQueryDto queryObject)
        {
            var account = Database.Accounts.FirstOrDefault(a => a.Id == queryObject.AccountId);
            var accountInfo = Mapper.Map<EvaluationPlatformDomain.Models.Account.Account, AccountInfo>(account);

            var teacher = Database.Teachers.FirstOrDefault(t => t.Person.Id == account.Person.Id);
            accountInfo.TeacherId  = teacher?.Id ?? Guid.Empty;

            return accountInfo;

        }
    }
}