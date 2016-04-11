using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Account;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformLogic.CommandAndQuery.Account.Commands;
using EvaluationPlatformLogic.CommandAndQuery.Account.QueryDto;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformWebApi.Authentication;

namespace EvaluationPlatformWebApi.Controllers
{
    
    [RoutePrefix("api/accounts")]
    [CustomAutorize(AccountRoleType.UserRole, AccountRoleType.Admin)]
    public class AccountController : BaseWebApiController
    {

        public AccountController(IQueryProccesor queryProcessor, ICommandProcessor commandProcessor) : base(commandProcessor,queryProcessor)
        { }
        
        [CustomAutorize(AccountRoleType.Admin)]
        [Route("getAccounts")]
        [HttpGet]
        public List<AccountInfo> GetAccounts()
        {

            return QueryProccesor.Execute(new GetAccountsQueryDto());
        }

        [CustomAutorize(AccountRoleType.Admin)]
        [Route("createAccount")]
        [HttpPost]
        public HttpResponseMessage CreateAccount(CreateAccountInfo createAccountInfo)
        {
            CommandProcessor.Execute(new CreateAccountCommandDto(createAccountInfo));

            return new HttpResponseMessage(HttpStatusCode.OK); 
        }
    }
}