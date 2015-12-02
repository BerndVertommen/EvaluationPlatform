using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDomain.Models
{
    public enum NotScoredReason
    {
        NotProvided = 0,
        UnKnown     = 1,
        Absent      = 2,
        OtherTask   = 3
    }
}
