using System;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformWebApi.Authentication;
using EvaluationPlatformWebApi.DataAccesors.Evaluation;
using EvaluationPlatformWebApi.Identity;

namespace EvaluationPlatformWebApi.Controllers
{
    [RoutePrefix("api/evaluation")]
    public class EvaluationController : BaseWebApiController
    {
        private readonly IQueryProccesor _queryProccesor;
        private readonly ICommandProcessor _commandProcessor;

        public EvaluationController(IQueryProccesor queryProccesor, ICommandProcessor commandProcessor)
        {
            _queryProccesor = queryProccesor;
            _commandProcessor = commandProcessor;

        }

        [CustomAutorize(AccountRoleType.UserRole)]
        [HttpGet]
        public CreateEvaluationOptions GetCreateEvaluationOptions()
        {

            return _queryProccesor.Execute(new GetCreateEvaluationOptionsQueryObject(AccountId));
        }
    
}
}