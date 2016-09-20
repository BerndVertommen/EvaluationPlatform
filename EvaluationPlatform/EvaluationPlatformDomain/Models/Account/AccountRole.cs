using System.Collections.Generic;
using EvaluationPlatformDomain.Models.BaseEntities;

namespace EvaluationPlatformDomain.Models.Account
{
    public class AccountRole : Entity
    {
        public virtual AccountRoleType AccountRoleType { get; protected set; }
        public virtual ICollection<Account> Accounts { get; protected set; }

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