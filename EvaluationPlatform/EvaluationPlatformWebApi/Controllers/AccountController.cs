using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformWebApi.DataAccesors.Account.QueryObjects;
using System.Collections.Generic;
using System.Web.Http;

namespace EvaluationPlatformWebApi.Controllers
{
    
    [RoutePrefix("api/accounts")]
    public class AccountController : BaseWebApiController
    {

        public AccountController(IQueryProccesor queryProcessor, ICommandProcessor commandProcessor) : base(commandProcessor,queryProcessor)
        {

        }

       

        [Route("getAccounts")]
        [HttpGet]
        public List<AccountInfo> GetAccounts()
        {

            return QueryProccesor.Execute(new GetAccountsQueryObject());
        }

    }
}