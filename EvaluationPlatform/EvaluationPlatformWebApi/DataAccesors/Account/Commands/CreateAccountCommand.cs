using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EvaluationPlatformDataTransferModels.InformationModels.Account;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Account.Commands
{
    public class CreateAccountCommand : ICommandObject
    {
        public CreateAccountInfo CreateAccountInfo { get; set; }

        public CreateAccountCommand(CreateAccountInfo createAccountInfo)
        {
            CreateAccountInfo = createAccountInfo;
        }
    }
}