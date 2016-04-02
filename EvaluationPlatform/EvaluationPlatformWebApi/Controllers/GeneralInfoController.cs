using System.Collections.Generic;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.General.QueryDto;
using EvaluationPlatformWebApi.Authentication;

namespace EvaluationPlatformWebApi.Controllers
{
    [RoutePrefix("api/generalInfo")]
    [CustomAutorize(AccountRoleType.UserRole, AccountRoleType.Admin)]
    public class GeneralInfoController : BaseWebApiController
    {
        public GeneralInfoController(IQueryProccesor queryProccesor, ICommandProcessor commandProcessor) : base(commandProcessor,queryProccesor)
        {
            
        }

        [Route("getschoolyears")]
        [HttpGet]
        public IEnumerable<SchoolYearInfo> GetSchoolYears()
        {
            return QueryProccesor.Execute(new GetSchoolYearsQueryDto());
        }
    }
}