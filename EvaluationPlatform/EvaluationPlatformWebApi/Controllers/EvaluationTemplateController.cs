using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.EvaluationTemplate;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.Command;
using EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates;
using EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.Command;
using EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.QueryObjects;
using EvaluationPlatformWebApi.Authentication;

namespace EvaluationPlatformWebApi.Controllers
{
    [RoutePrefix("api/evaluationTemplate")]
    [CustomAutorize(AccountRoleType.UserRole, AccountRoleType.Admin)]
    public class EvaluationTemplateController : BaseWebApiController
    {
        public EvaluationTemplateController(ICommandProcessor commandProcessor, IQueryProccesor queryProccesor): base (commandProcessor, queryProccesor)
        {
        }

        [HttpGet]
        public CreateEvaluationOptions GetCreateEvaluationOptions()
        {
            return QueryProccesor.Execute(new GetCreateEvaluationOptionsQueryObject(AccountId));
        }

        [Route("createTemplate")]
        [HttpPost]
        public HttpResponseMessage CreateEvaluationTemplate(EvaluationTemplateInfo evaluationTemplateInfo)
        {
            CommandProcessor.Execute(new CreateEvaluationTemplateCommand(evaluationTemplateInfo, AccountId));

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [Route("getEvaluationTemplates")]
        [HttpGet]
        public IEnumerable<EvaluationTemplateInfo> GetEvaluationTemplates()
        {
            
            return QueryProccesor.Execute(new GetEvaluationTemplatesQueryObject(AccountId));
        }

        [Route("createEvaluationFromTemplate")]
        [HttpPost]
        public HttpResponseMessage CreateEvaluationFromTemplate(CreateEvaluationCommand command)
        {
            command.TeacherId = GetAccountInfo().TeacherId;

            CommandProcessor.Execute(command);

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [Route("hideTemplates")]
        [HttpPost]
        public HttpResponseMessage HideEvaluationTemplates(IEnumerable<EvaluationTemplateInfo> evaluationTemplates)
        {
            CommandProcessor.Execute(new HideEvaluationTemplatesCommand(evaluationTemplates));

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}