using System.Net;
using System.Net.Http;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformWebApi.Authentication;
using EvaluationPlatformWebApi.DataAccesors.Evaluation;

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

        [CustomAutorize(AccountRoleType.UserRole)]
        [Route("createTemplate")]
        [HttpPost]
        public HttpResponseMessage PostEvaluationTemplate(EvaluationTemplateInfo evaluationTemplateInfo)
        {
            _commandProcessor.Execute(new AddEvaluationTemplateCommand(evaluationTemplateInfo, AccountId));

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
}
}