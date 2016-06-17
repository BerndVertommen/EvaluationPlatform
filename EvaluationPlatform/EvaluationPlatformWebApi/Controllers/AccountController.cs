using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper;
using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Account;
using EvaluationPlatformDomain.Models.Account;
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

        [CustomAutorize(AccountRoleType.Admin)]
        [Route("getAccount/{username}")]
        [HttpGet]
        public AccountInfo GetAccount(string username)
        {
            var account = QueryProccesor.Execute(new GetAccountQueryDto(username));
            return Mapper.Map<Account, AccountInfo>(account);
        }
    }
}