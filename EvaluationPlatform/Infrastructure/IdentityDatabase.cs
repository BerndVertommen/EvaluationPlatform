﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;

namespace Infrastructure
{
    public abstract class IdentityDatabase : IdentityDbContext<Account>
    {
    }
}
