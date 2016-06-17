using System;
using System.Collections.Generic;
using Microsoft.AspNet.Identity;

namespace EvaluationPlatformDomain.Models.Authentication
{
    public class AccountRole : Entity
    {
        public virtual AccountRoleType AccountRoleType { get; protected set; }
        public virtual ICollection<Account.Account> Accounts { get; protected set; }

        public bool IsAdministratorRole => AccountRoleType == AccountRoleType.Admin || AccountRoleType == AccountRoleType.Developer;

        public AccountRole()
        {
            
        }

        public AccountRole(AccountRoleType accountRoleType)
        {
            AccountRoleType = accountRoleType;
        }

       
    }
}