using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDomain.Models.Scales
{
    public interface IScale
    {
        int MinScore { get; set; }
        int MaxScore { get; set; }


    }
}
