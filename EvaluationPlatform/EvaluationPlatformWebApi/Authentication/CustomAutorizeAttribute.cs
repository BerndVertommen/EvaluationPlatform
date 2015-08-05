using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using BabyLink.WebApi.Identity;
using EvaluationPlatformWebApi.Models;

namespace EvaluationPlatformWebApi.Authentication
{
    public class CustomAutorizeAttribute : AuthorizeAttribute
    {
        private List<AccountRole> _accountRoles;

        public CustomAutorizeAttribute(params AccountRole[] roleTypes)
        {
            if (_accountRoles ==null)
            {
                _accountRoles = new List<AccountRole>();
            }
            _accountRoles.AddRange(roleTypes);
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if (Authorize(actionContext))
            {
                return;
            }
            HandleUnauthorizedRequest(actionContext);

        }

        protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
        {
            var responsemessage = new HttpResponseMessage(HttpStatusCode.Unauthorized);
            responsemessage.Headers.Add("WWW-Authenticate", "Basic");
            actionContext.Response = responsemessage;
        }

        private bool Authorize(HttpActionContext actionContext)
        {
            CurrentIdentityHelper currentIdentityHelper = new CurrentIdentityHelper();
            var roles = currentIdentityHelper.GetRoleTypes();
            if (roles == null)
            {
                return false;
            }
            return _accountRoles.Any(role => roles.Contains(role.ToString()));
        }
    }

}