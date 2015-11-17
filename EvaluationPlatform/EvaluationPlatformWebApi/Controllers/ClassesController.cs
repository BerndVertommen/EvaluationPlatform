using System.Web.Http;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformWebApi.Authentication;
using EvaluationPlatformWebApi.DataAccesors.Class;

namespace EvaluationPlatformWebApi.Controllers
{
    [RoutePrefix("api/class")]
    public class ClassesController : BaseWebApiController
    {
        public ClassesController()
        {
        }

        [CustomAutorize(AccountRoleType.Admin)]
        [Route("test")]
        [HttpGet]
        public ClassInfo GetClassViewInfo()
        {
            return QueryProccesor.Execute(new ClassViewInfoQueryObject("1NF", new SchoolYear(2015, 2016)));
        }
    }
}
