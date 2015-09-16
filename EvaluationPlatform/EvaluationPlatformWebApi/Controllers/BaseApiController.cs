using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using EvaluationPlatformWebApi.AccountManagement;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace EvaluationPlatformWebApi.Controllers
{
    public class BaseApiController : ApiController
    {
        private ModelFactory _modelFactory;
        private AccountManager _accountManager = null;

        protected AccountManager AccountManager
        {
            get
            {
                return _accountManager ?? Request.GetOwinContext().GetUserManager<AccountManager>();
            }
        }

        public BaseApiController()
        {
        }

        protected ModelFactory TheModelFactory
        {
            get
            {
                if (_modelFactory == null)
                {
                    _modelFactory = new ModelFactory(this.Request, this.AccountManager);
                }
                return _modelFactory;
            }
        }

        protected IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
    }
}
