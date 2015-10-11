using System.Web.Http;

namespace EvaluationPlatformWebApi.Controllers
{
    [OverrideAuthorization]
    [RoutePrefix("api/accounts")]
    public class AccountController : ApiController
    {
        public AccountController()
        {

        }


    }
}