using System;
using Microsoft.AspNet.Identity;

namespace EvaluationPlatformDomain.Models.Authentication
{
    public class AccountRole : Entity
    {
        public AccountRoleType AccountRoleType { get; protected set; }

        public AccountRole()
        {
            
        }

        public AccountRole(AccountRoleType accountRoleType)
        {
            AccountRoleType = accountRoleType;
        }
    }
}