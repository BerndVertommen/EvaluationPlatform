﻿using System.Security.Claims;
using System.Threading.Tasks;
using Autofac;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformWebApi.AccountManagement;
using Infrastructure;
using Microsoft.AspNet.Identity.Owin;
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
                //var allowedOrigin = "*";

                //context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });

                var accountManager = context.OwinContext.GetUserManager<AccountManager>();

                Account user = await accountManager.FindAsync(context.UserName, context.Password);

                if (user == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }

                if (!user.EmailConfirmed)
                {
                    context.SetError("invalid_grant", "User did not confirm email.");
                    return;
                }

                ClaimsIdentity oAuthIdentity = await accountManager.CreateIdentityAsync(user, "JWT");

                var ticket = new AuthenticationTicket(oAuthIdentity, null);

                context.Validated(ticket);
                /*
                var claimsIdentity = new ClaimsIdentity(context.Options.AuthenticationType);
                //claimsIdentity.AddClaim(new Claim(ClaimTypes.Name, account.UserName));
                //claimsIdentity.AddClaim(new Claim("accountId", account.Id.ToString()));

                //claimsIdentity.AddClaim(new Claim("PersonId", account.BabyPerson.Id.ToString()));

                claimsIdentity.AddClaim(new Claim("IP", context.Request.RemoteIpAddress));

                //var authenticationProperties = new AuthenticationProperties()
                //{
                //    ExpiresUtc = DateTime.UtcNow.AddHours(24),
                //    IsPersistent = true,
                //};

                //// store authentication ticket absolution expiration date
                //// It will be used afterwards to check the maximum validity of the access token
                //var absoluteExpirationDate = authenticationProperties.ExpiresUtc.ToString();

                //authenticationProperties.Dictionary.Add("abs-expires-utc", absoluteExpirationDate);

                var ticket = new AuthenticationTicket(claimsIdentity, new AuthenticationProperties());

                //_oAuthAuthorizationServerOptions.AccessTokenExpireTimeSpan =
                //    bank.Configuration.Account.LoginTimeoutSlidingExpiration;

                context.Validated(ticket);*/
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