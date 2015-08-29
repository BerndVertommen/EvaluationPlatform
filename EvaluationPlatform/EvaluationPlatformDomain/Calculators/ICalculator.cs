using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDomain.Calculators
{
    public interface ICalculator<in TCalculatorInfo, out TResult> where TCalculatorInfo : ICalculatorInfo
    {
        TResult Calculate(TCalculatorInfo parameters);
    }
}
