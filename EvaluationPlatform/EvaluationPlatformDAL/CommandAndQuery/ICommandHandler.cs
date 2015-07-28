using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDAL.CommandAndQuery
{
    public interface ICommandHandler<TCommandObject>
    {
        void Handle(TCommandObject commandObject);
    }
}
