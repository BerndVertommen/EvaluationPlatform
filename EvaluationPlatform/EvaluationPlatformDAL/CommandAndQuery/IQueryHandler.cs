using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDAL.CommandAndQuery
{
    public interface IQueryHandler<in TQuery, TResult> where TQuery : IQueryObject<TResult>
    {
        TResult Handle(TQuery query);
    }
}
