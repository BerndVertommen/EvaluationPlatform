using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformWebApi.Authentication;
using EvaluationPlatformWebApi.DataAccesors.Evaluation;
using EvaluationPlatformWebApi.DataAccesors.Evaluation.Command;
using EvaluationPlatformWebApi.DataAccesors.EvaluationTemplates;

namespace EvaluationPlatformWebApi.Controllers
{
    [RoutePrefix("api/evaluationTemplate")]
    public class EvaluationTemplateController : BaseWebApiController
    {
        private readonly IQueryProccesor _queryProccesor;
        private readonly ICommandProcessor _commandProcessor;

        public EvaluationTemplateController(IQueryProccesor queryProccesor, ICommandProcessor commandProcessor)
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
            _commandProcessor.Execute(new CreateEvaluationTemplateCommand(evaluationTemplateInfo, AccountId));

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [CustomAutorize(AccountRoleType.UserRole)]
        [Route("getEvaluationTemplates")]
        [HttpGet]
        public IEnumerable<EvaluationTemplateInfo> GetEvaluationTemplates()
        {

            return _queryProccesor.Execute(new GetEvaluationTemplatesQueryObject(AccountId));
        }

        [CustomAutorize(AccountRoleType.UserRole)]
        [Route("createEvaluationFromTemplate")]
        [HttpPost]
        public HttpResponseMessage CreateEvaluationFromTemplate(CreateEvaluationCommand command)
        {
            command.TeacherId = GetAccountInfo().TeacherId;

            CommandProcessor.Execute(command);

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}