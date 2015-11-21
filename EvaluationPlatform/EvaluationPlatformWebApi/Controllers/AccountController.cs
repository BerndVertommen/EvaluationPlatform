using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Account;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformWebApi.Authentication;
using EvaluationPlatformWebApi.DataAccesors.Account.Commands;
using EvaluationPlatformWebApi.DataAccesors.Account.QueryObjects;

namespace EvaluationPlatformWebApi.Controllers
{
    
    [RoutePrefix("api/accounts")]
    public class AccountController : BaseWebApiController
    {

        public AccountController(IQueryProccesor queryProcessor, ICommandProcessor commandProcessor) : base(commandProcessor,queryProcessor)
        { }
        
        [CustomAutorize(AccountRoleType.Admin)]
        [Route("getAccounts")]
        [HttpGet]
        public List<AccountInfo> GetAccounts()
        {

            return QueryProccesor.Execute(new GetAccountsQueryObject());
        }

        [CustomAutorize(AccountRoleType.Admin)]
        [Route("createAccount")]
        [HttpPost]
        public HttpResponseMessage CreateAccount(CreateAccountInfo createAccountInfo)
        {
            CommandProcessor.Execute(new CreateAccountCommand(createAccountInfo));

            return new HttpResponseMessage(HttpStatusCode.OK); 
        }
    }
}