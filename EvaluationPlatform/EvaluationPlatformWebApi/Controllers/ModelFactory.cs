using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Http.Routing;
using EvaluationPlatformWebApi.AccountManagement;
using Infrastructure;

namespace EvaluationPlatformWebApi.Controllers
{
    public class ModelFactory
    {
        private UrlHelper _UrlHelper;
        private AccountManager _accountManager;

        public ModelFactory(HttpRequestMessage request, AccountManager accountManager)
        {
            _UrlHelper = new UrlHelper(request);
            _accountManager = accountManager;
        }

        public UserReturnModel Create(Account appUser)
        {
            return new UserReturnModel
            {
                Url = _UrlHelper.Link("GetUserById", new { id = appUser.Id }),
                Id = appUser.Id,
                UserName = appUser.UserName,
                FullName = string.Format("{0} {1}", appUser.FirstName, appUser.LastName),
                Email = appUser.Email,
                EmailConfirmed = appUser.EmailConfirmed,
                RegisterDate = appUser.RegisterDate,
                Roles = _accountManager.GetRolesAsync(appUser.Id).Result,
                Claims = _accountManager.GetClaimsAsync(appUser.Id).Result
            };
        }
    }

    public class UserReturnModel
    {
        public string Url { get; set; }
        public string Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public DateTime RegisterDate { get; set; }
        public IList<string> Roles { get; set; }
        public IList<System.Security.Claims.Claim> Claims { get; set; }
    }

}