using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.Command;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.PagedQueryResults;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryObjects;
using EvaluationPlatformWebApi.Authentication;

namespace EvaluationPlatformWebApi.Controllers
{
    [RoutePrefix("api/evaluation")]
    [CustomAutorize(AccountRoleType.UserRole, AccountRoleType.Admin)]
    public class EvaluationController : BaseWebApiController
    {

        public EvaluationController(IQueryProccesor queryProccesor, ICommandProcessor commandProcessor)
            : base(commandProcessor, queryProccesor)
        {

        }

        [Route("plannedEvaluations")]
        [HttpGet]
        public IEnumerable<EvaluationBaseInfo> PlannedEvaluations()
        {
            return QueryProccesor.Execute(new PlannedEvaluationBaseInfoQueryObject(AccountId));
        }

        [Route("evaluationsForBundle")]
        [HttpPost]
        public IEnumerable<EvaluationInfo> EvaluationsForbundle(GuidDto bundleIdDto)
        {
            return QueryProccesor.Execute(new EvaluationInfosForBundleQueryObject(bundleIdDto.Id));
        }

        [Route("updateEvaluation")]
        [HttpPost]
        public EvaluationInfo UpdateEvaluation(EvaluationInfo evaluationInfo)
        {
            CommandProcessor.Execute(new UpdateEvaluationItemsCommandObject(evaluationInfo));


            return QueryProccesor.Execute(new EvaluationsQueryObject(new List<Guid>() {evaluationInfo.Id})).FirstOrDefault();
        }

        [Route("updateEvaluations")]
        [HttpPost]
        public IEnumerable<EvaluationInfo> UpdateEvaluations(IEnumerable<EvaluationInfo> evaluationInfos)
        {
            if (evaluationInfos.Any())
            {
                foreach (var evaluationinfo in evaluationInfos)
                {
                    CommandProcessor.Execute(new UpdateEvaluationItemsCommandObject(evaluationinfo));
                }
            }

            var infoIds = evaluationInfos.Select(evaluationInfo => evaluationInfo.Id).ToList();

            return QueryProccesor.Execute(new EvaluationsQueryObject(infoIds));
        }

        [Route("searchEvaluations")]
        [HttpPost]
        public EvaluationsPagedQueryResult SearchEvaluations(EvaluationsPagedQueryObject evaluationsQueryObject)
        {
            return QueryProccesor.Execute(evaluationsQueryObject);
        }
    }

}