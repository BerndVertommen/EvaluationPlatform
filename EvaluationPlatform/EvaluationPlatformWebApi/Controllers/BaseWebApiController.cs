using System;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.InformationModels.Account;
using EvaluationPlatformLogic.CommandAndQuery.Account.QueryObjects;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformWebApi.Identity;

namespace EvaluationPlatformWebApi.Controllers
{
    public abstract class BaseWebApiController : ApiController
    {
        protected readonly ICommandProcessor CommandProcessor;
        protected readonly IQueryProccesor QueryProccesor;

        protected BaseWebApiController(ICommandProcessor commandProcessor, IQueryProccesor queryProccesor)
        {
            CommandProcessor = commandProcessor;
            QueryProccesor = queryProccesor;
        }
        protected BaseWebApiController()
        {
        }

        public Guid AccountId
        {
            get
            {
                try
                {
                    return new CurrentIdentityHelper().GetAccountId().Value;
                }
                catch (NullReferenceException)
                {
                    return Guid.Empty;
                }

            }
        }

        protected AccountInfo GetAccountInfo()
        {
          return QueryProccesor.Execute(new GetAccountInfoQueryObject(AccountId));
        }


    }
}