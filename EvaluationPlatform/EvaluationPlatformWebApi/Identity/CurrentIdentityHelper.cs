using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace EvaluationPlatformWebApi.Identity
{
    public class CurrentIdentityHelper : ICurrentIdentityHelper
    {
        public CurrentIdentityHelper()
        {}

        private ClaimsPrincipal Principal
        {
            get
            {
                var user = HttpContext.Current.User as ClaimsPrincipal;
                if (user== null)
                {
                    throw new NullReferenceException("no pricipal");
                }
                return user;
            }
        }
        /// <summary>
        /// Gets the claims.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<Claim> GetClaims()
        {
            var identity = Principal.Identity ;
            if (identity != null)
            {
                ClaimsIdentity claimsIdentity = identity as ClaimsIdentity;
                if (claimsIdentity != null)
                {
                    return claimsIdentity.Claims;
                }
            }
            throw new NullReferenceException("no claims");
        }

        /// <summary>
        /// Gets the account identifier.
        /// </summary>
        /// <returns></returns>
        public Guid? GetAccountId()
        {
            var principal = Principal;

            var claim = GetClaims().FirstOrDefault(c => c.Type == "accountId");
            if (claim == null)
            {
                throw new NullReferenceException("No account id");
            }
            var userid = Guid.Parse(claim.Value);

            return userid;
        }

        public string GetAccountName()
        {
            var principal = Principal;
            return principal.Identity.Name;
        }

        public IEnumerable<string> GetRoleTypes()
        {
            var claims = GetClaims().Where(c => c.Type == ClaimTypes.Role);
            return claims.Select(claim => claim.Value);
        }

    }
}