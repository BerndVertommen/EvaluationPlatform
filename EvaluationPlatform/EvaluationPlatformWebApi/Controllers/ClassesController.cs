using System.Collections.Generic;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformWebApi.Authentication;
using EvaluationPlatformWebApi.DataAccesors.Class.QueryObjects;

namespace EvaluationPlatformWebApi.Controllers
{
    [RoutePrefix("api/class")]
    public class ClassesController : BaseWebApiController
    {
        public ClassesController(IQueryProccesor queryProccesor, ICommandProcessor commandProcessor):base(commandProcessor,queryProccesor)
        {
        }
        
        [CustomAutorize(AccountRoleType.UserRole)]
        [Route("classesForTeacher")]
        [HttpGet]
        public IEnumerable<ClassInfo> ClassesForTeacher()
        {
            var accountInfo = GetAccountInfo();

            return QueryProccesor.Execute(new ClassesForTeacherQueryObject(accountInfo.TeacherId));
        }
    }
}
