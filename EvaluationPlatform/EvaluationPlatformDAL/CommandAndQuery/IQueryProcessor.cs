﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDAL.CommandAndQuery
{
    public interface IQueryProccesor
    {
        TResult Execute<TResult>(IQueryObject<TResult> query);
    }
}