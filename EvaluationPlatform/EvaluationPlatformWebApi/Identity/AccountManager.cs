using EvaluationPlatformDAL;
using Infrastructure;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;

namespace EvaluationPlatformWebApi.Identity
{
    public class AccountManager : UserManager<Account>
    {
        public AccountManager(IUserStore<Account> store) : base(store)
        {}

        public static AccountManager Create(IdentityFactoryOptions<AccountManager> options, IOwinContext context)
        {
            var appDbContext = context.Get<IdentityDatabase>();
            var appUserManager = new AccountManager(new UserStore<Account>(appDbContext));

            // Configure validation logic for usernames
            appUserManager.UserValidator = new UserValidator<Account>(appUserManager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };

            // Configure validation logic for passwords
            appUserManager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                appUserManager.UserTokenProvider = new DataProtectorTokenProvider<Account>(dataProtectionProvider.Create("ASP.NET Identity"));
            }

            return appUserManager;
        }
    }
}
