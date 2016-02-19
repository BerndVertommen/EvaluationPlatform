using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.StudyPlan.QueryObjects;
using EvaluationPlatformWebApi.Authentication;

namespace EvaluationPlatformWebApi.Controllers
{
    [RoutePrefix("api/studyPlans")]
    [CustomAutorize(AccountRoleType.UserRole, AccountRoleType.Admin)]
    public class StudyPlanController : BaseWebApiController
    {
        public StudyPlanController(ICommandProcessor commandProcessor, IQueryProccesor queryProccesor)
            : base(commandProcessor, queryProccesor)
        {

        }

        [CustomAutorize(AccountRoleType.Admin)]
        [Route("allStudyPlans")]
        [HttpGet]
        public IEnumerable<StudyPlanInfo> GetStudyPlans()
        {
            return QueryProccesor.Execute(new StudyPlanQueryObject());
        }

       

    }
}
