using System;
using System.Web.Http;
using EvaluationPlatformDAL.CommandAndQuery;
using System.Net.Http;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Account;
using EvaluationPlatformDomain.Models.Account;
using EvaluationPlatformWebApi.DataAccesors.Account;
using EvaluationPlatformWebApi.DataAccesors.Account.QueryObjects;
using EvaluationPlatformWebApi.Identity;
using Microsoft.AspNet.Identity;

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