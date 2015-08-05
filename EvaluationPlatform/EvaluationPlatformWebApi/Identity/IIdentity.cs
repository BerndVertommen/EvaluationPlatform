using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace BabyLink.WebApi.Identity
{
    public interface ICurrentIdentityHelper
    {
        /// <summary>
        /// Defines Interface that allows return claims from the current thread <see cref="ICurrentIdentityHelper"/>
        /// </summary>
        /// <summary>
        /// Gets the claims.
        /// </summary>
        /// <param name="obj">The object.</param>
        /// <returns></returns>
        IEnumerable<Claim> GetClaims();

        /// <summary>
        /// Gets the account identifier.
        /// </summary>
        /// <param name="obj">The object.</param>
        /// <returns></returns>
        Guid? GetAccountId();

    }
}
