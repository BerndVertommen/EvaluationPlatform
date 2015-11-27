using System.Collections.Generic;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.BaseInfoModels;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformWebApi.Authentication;
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
    }

}