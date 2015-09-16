using System;
using EvaluationPlatformDAL;
using Infrastructure;
using Infrastructure.Email;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace EvaluationPlatformWebApi.AccountManagement
{
    public class AccountManager : UserManager<Account>
    {
        public AccountManager(IUserStore<Account> store) : base(store)
        {}

        public static AccountManager Create(IdentityFactoryOptions<AccountManager> options, IOwinContext context)
        {
            var appDbContext = OwinContextExtensions.Get<EPDatabase>(context);
            AccountManager accountManager = new AccountManager(new UserStore<Account>(appDbContext));

            // Configure validation logic for usernames
            accountManager.UserValidator = new UserValidator<Account>(accountManager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };

            // Configure validation logic for passwords
            accountManager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };

            
            accountManager.EmailService = new EmailService();
            
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                accountManager.UserTokenProvider = new DataProtectorTokenProvider<Account>(dataProtectionProvider.Create("ASP.NET Identity"))
                {
                    //Code for email confirmation and reset password life time
                    TokenLifespan = TimeSpan.FromHours(6)
                };
            }

            return accountManager;
        }
    }
}
