using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using EvaluationPlatformDomain.Models.Account;
using EvaluationPlatformWebApi.Identity;

namespace EvaluationPlatformWebApi.Authentication
{
    public class CustomAutorizeAttribute : AuthorizeAttribute
    {
        private List<AccountRoleType> _accountRolesTypes;

        public CustomAutorizeAttribute(params AccountRoleType[] roleTypes)
        {
            if (_accountRolesTypes == null)
            {
                _accountRolesTypes = new List<AccountRoleType>();
            }

            _accountRolesTypes.Add(AccountRoleType.Developer);
            foreach (AccountRoleType role in roleTypes)
            {
                
                _accountRolesTypes.Add(role);
            }

            //_accountRolesTypes.AddRange(roleType);
           
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
            bool result = _accountRolesTypes.Any(role => roles.Any(r => r == role.ToString()));
            return result;
        }
    }

}