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
        public IEnumerable<StudyPlanInfo> GetStudyPlans()
        {
            return QueryProccesor.Execute(new StudyPlanQueryDto());
        }

        [CustomAutorize(AccountRoleType.UserRole)]
        [Route("createStudyPlan")]
        [HttpPost]
        public HttpResponseMessage CreateStudyPlan(CreateStudyPlanInfo createStudyPlanInfo)
        {
           CommandProcessor.Execute(new CreateStudyPlanCommandDto(createStudyPlanInfo));

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [CustomAutorize(AccountRoleType.UserRole)]
        [Route("addGeneralGoal")]
        [HttpPost]
        public HttpResponseMessage AddGeneralGoal(CreateGeneralGoalInfo createGeneralGoalInfo, GuidDto guidDto)
        {
            CommandProcessor.Execute(new AddGeneralGoalToStudyPlanCommandDto(guidDto.Id, createGeneralGoalInfo));

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [CustomAutorize(AccountRoleType.UserRole)]
        [Route("removeGeneralGoal")]
        [HttpPost]
        public HttpResponseMessage RemoveGeneralGoal(GuidDto guidDto)
        {
            CommandProcessor.Execute(new RemoveGeneralGoalFromStudyPlanCommandDto(guidDto.Id));

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

    }
}
