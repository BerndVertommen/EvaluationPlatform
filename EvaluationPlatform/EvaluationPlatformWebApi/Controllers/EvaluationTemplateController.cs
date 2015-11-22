using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.CreationModels;
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


        public EvaluationTemplateController(ICommandProcessor commandProcessor, IQueryProccesor queryProccesor): base (commandProcessor, queryProccesor)
        {
        }

        [CustomAutorize(AccountRoleType.UserRole)]
        [HttpGet]
        public CreateEvaluationOptions GetCreateEvaluationOptions()
        {
            return QueryProccesor.Execute(new GetCreateEvaluationOptionsQueryObject(AccountId));
        }

        [CustomAutorize(AccountRoleType.UserRole)]
        [Route("createTemplate")]
        [HttpPost]
        public HttpResponseMessage CreateEvaluationTemplate(EvaluationTemplateInfo evaluationTemplateInfo)
        {
            CommandProcessor.Execute(new CreateEvaluationTemplateCommand(evaluationTemplateInfo, AccountId));

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [CustomAutorize(AccountRoleType.UserRole)]
        [Route("getEvaluationTemplates")]
        [HttpGet]
        public IEnumerable<EvaluationTemplateInfo> GetEvaluationTemplates()
        {
            
            return QueryProccesor.Execute(new GetEvaluationTemplatesQueryObject(AccountId));
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