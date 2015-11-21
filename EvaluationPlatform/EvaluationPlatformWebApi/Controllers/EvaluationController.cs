using System.Web.Http;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.Controllers
{
    [RoutePrefix("api/evaluation")]
    public class EvaluationController : BaseWebApiController
    {
      

        public EvaluationController(IQueryProccesor queryProccesor, ICommandProcessor commandProcessor) : base(commandProcessor,queryProccesor)
        {
      
        }

    }
}