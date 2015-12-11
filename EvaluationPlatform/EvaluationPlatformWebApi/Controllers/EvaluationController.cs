using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformWebApi.Authentication;
using EvaluationPlatformWebApi.DataAccesors.Evaluation.Command;
using EvaluationPlatformWebApi.DataAccesors.Evaluation.QueryObjects;

namespace EvaluationPlatformWebApi.Controllers
{
    [RoutePrefix("api/evaluation")]
    public class EvaluationController : BaseWebApiController
    {

        public EvaluationController(IQueryProccesor queryProccesor, ICommandProcessor commandProcessor)
            : base(commandProcessor, queryProccesor)
        {

        }

        [Route("plannedEvaluations")]
        [CustomAutorize(AccountRoleType.UserRole)]
        [HttpGet]
        public IEnumerable<EvaluationBaseInfo> PlannedEvaluations()
        {
            return QueryProccesor.Execute(new PlannedEvaluationBaseInfoQueryObject(AccountId));
        }

        [Route("evaluationsForBundle")]
        [CustomAutorize(AccountRoleType.UserRole)]
        [HttpPost]
        public IEnumerable<EvaluationInfo> EvaluationsForbundle(GuidDto bundleIdDto)
        {
            return QueryProccesor.Execute(new EvaluationInfosForBundleQueryObject(bundleIdDto.Id));
        }

        [Route("updateEvaluation")]
        [CustomAutorize(AccountRoleType.UserRole)]
        [HttpPost]
        public HttpResponseMessage UpdateEvaluation(EvaluationInfo evaluationInfo)
        {
            CommandProcessor.Execute(new UpdateEvaluationItemsCommandObject(evaluationInfo.Id, evaluationInfo.EvaluationItems));

            return new HttpResponseMessage();
        }

        [Route("updateEvaluations")]
        [CustomAutorize(AccountRoleType.UserRole)]
        [HttpPost]
        public HttpResponseMessage UpdateEvaluation(IEnumerable<EvaluationInfo> evaluationInfos)
        {
            if (evaluationInfos.Any())
            {
                foreach (var evaluationinfo in evaluationInfos)
                {
                    CommandProcessor.Execute(new UpdateEvaluationItemsCommandObject(evaluationinfo.Id, evaluationinfo.EvaluationItems));
                }
            }

            return new HttpResponseMessage();
        }
    }

}