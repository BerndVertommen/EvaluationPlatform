using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Autofac;
using EvaluationPlatformDomain.Models.Account;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformLogic.CommandAndQuery.Account.QueryDto;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;

namespace EvaluationPlatformWebApi.Authentication
{
    public class CustomOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly IQueryProccesor _queryProcessor;
        private readonly ILifetimeScope _lifetimeScope;

        public CustomOAuthProvider(IQueryProccesor queryProcessor, ILifetimeScope lifetimeScope)
        {
            _queryProcessor = queryProcessor;
            _lifetimeScope = lifetimeScope;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            //var userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();
            //ApplicationUser user = await userManager.FindAsync(context.UserName, context.Password); //debug
            using (var lifeTimeScope = _lifetimeScope.BeginLifetimeScope())
            {

                Account user = _queryProcessor.Execute(new GetAccountQueryDto(context.UserName));

                if (user == null)
                {
                    context.SetError("invalid_grant", "Invalid credentials: Username or Password incorrect");
                    context.Rejected();
                    return;
                }

                if (!user.VerifyPassword(context.Password))
                {
                    context.SetError("invalid_grant", "Invalid credentials: Username or Password incorrect");
                    context.Rejected();
                    return;
                }

                //if (!user.EmailConfirmed)
                //{
                //    context.SetError("invalid_grant", "User did not confirm email.");
                //    return;
                //}
                
                var claimsIdentity = new ClaimsIdentity(context.Options.AuthenticationType);
                //ClaimsIdentity oAuthIdentity = await accountManager.CreateIdentityAsync(user, "JWT");
                claimsIdentity.AddClaim(new Claim(ClaimTypes.Name, user.Username));
                claimsIdentity.AddClaim(new Claim("accountId", user.Id.ToString()));
                claimsIdentity.AddClaim(new Claim("IP", context.Request.RemoteIpAddress));
               
                foreach (AccountRole role in user.AccountRoles)
                {
                    claimsIdentity.AddClaim(new Claim(ClaimTypes.Role, role.AccountRoleType.ToString()));
                }


                var authenticationProperties = new AuthenticationProperties()
                {
                    ExpiresUtc = DateTime.UtcNow.AddHours(24),
                    IsPersistent = true,
                };

                claimsIdentity.AddClaim(new Claim(ClaimTypes.Expiration, authenticationProperties.ExpiresUtc.ToString()));


                var ticket = new AuthenticationTicket(claimsIdentity, authenticationProperties);

                context.Validated(ticket);
               
           
            }
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // Note: We only support resource owner password grants, in which case there is no client_id involved
            if (context.ClientId == null) context.Validated();

            return Task.FromResult<object>(null);
        }

    }
}