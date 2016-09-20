using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.EvaluationTemplate;
using EvaluationPlatformDomain.Models.Account;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.CommandDto;
using EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates;
using EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.CommandDto;
using EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.QueryDto;
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
            return QueryProccesor.Execute(new GetCreateEvaluationOptionsQueryDto(AccountId));
        }

        [Route("createTemplate")]
        [HttpPost]
        public HttpResponseMessage CreateEvaluationTemplate(EvaluationTemplateInfo evaluationTemplateInfo)
        {
            CommandProcessor.Execute(new CreateEvaluationTemplateCommandDto(evaluationTemplateInfo, AccountId));

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [Route("getEvaluationTemplates")]
        [HttpGet]
        public IEnumerable<EvaluationTemplateInfo> GetEvaluationTemplates()
        {
            
            return QueryProccesor.Execute(new GetEvaluationTemplatesQueryDto(AccountId));
        }

        [Route("createEvaluationFromTemplate")]
        [HttpPost]
        public HttpResponseMessage CreateEvaluationFromTemplate(CreateEvaluationCommandDto command)
        {
            command.TeacherId = GetAccountInfo().TeacherId;

            CommandProcessor.Execute(command);

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [Route("hideTemplates")]
        [HttpPost]
        public HttpResponseMessage HideEvaluationTemplates(IEnumerable<EvaluationTemplateInfo> evaluationTemplates)
        {
            CommandProcessor.Execute(new HideEvaluationTemplatesCommandDto(evaluationTemplates));

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}