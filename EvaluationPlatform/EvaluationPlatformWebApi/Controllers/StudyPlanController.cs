using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.StudyPlan;
using EvaluationPlatformDomain.Models.Account;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.StudyPlan.CommandDto;
using EvaluationPlatformLogic.CommandAndQuery.StudyPlan.QueryDto;
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
        public IEnumerable<StudyPlanSummaryInfo> GetStudyPlans()
        {
            return QueryProccesor.Execute(new StudyPlanQueryDto());
        }

        [CustomAutorize(AccountRoleType.Admin)]
        [Route("getStudyPlanInfo")]
        [HttpPost]
        public StudyPlanInfo GetStudyPlanInfo(GuidDto guidDto)
        {
            return QueryProccesor.Execute(new GetStudyPlanInfoQueryDto(guidDto.Id));
        }

        [CustomAutorize(AccountRoleType.Admin)]
        [Route("createStudyPlan")]
        [HttpPost]
        public StudyPlanInfo CreateStudyPlan(CreateStudyPlanInfo createStudyPlanInfo)
        {
            var result = CommandProcessor.Execute(new CreateStudyPlanCommandDto(createStudyPlanInfo));

            return result;
        }

        [CustomAutorize(AccountRoleType.Admin)]
        [Route("addGeneralGoal")]
        [HttpPost]
        public GeneralGoalInfo AddGeneralGoal(CreateGeneralGoalInfo createGeneralGoalInfo)
        {
           var result = CommandProcessor.Execute(new AddGeneralGoalToStudyPlanCommandDto(createGeneralGoalInfo));

            return result;
        }

        [CustomAutorize(AccountRoleType.Admin)]
        [Route("removeGeneralGoal")]
        [HttpPost]
        public HttpResponseMessage RemoveGeneralGoal(GuidDto guidDto)
        {
            CommandProcessor.Execute(new RemoveGeneralGoalFromStudyPlanCommandDto(guidDto.Id));

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

    }
}
