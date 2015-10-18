using System;
using System.Web.Http;
using EvaluationPlatformDAL.CommandAndQuery;
using System.Net.Http;
using EvaluationPlatformWebApi.Identity;
using Microsoft.AspNet.Identity;

namespace EvaluationPlatformWebApi.Controllers
{
    public abstract class BaseWebApiController : ApiController
    {

        protected BaseWebApiController()
        {
        }

        public Guid? AccountId
        {
            get
            {
                try
                {
                    return new CurrentIdentityHelper().GetAccountId();
                }
                catch (NullReferenceException)
                {
                    return null;
                }

            }
        }
    }
}