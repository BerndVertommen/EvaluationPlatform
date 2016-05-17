using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDomain.Calculators
{
    public static class KoshResultTransformator
    {
        private static readonly Dictionary<decimal, decimal> TransformationDictionary = new Dictionary<decimal, decimal>()
        {
            {0.0m, 0 },
            {0.2m, 30},
            {0.4m, 35},
            {0.6m, 40},
            {0.8m, 45},
            {1.0m, 50},
            {1.1m, 52},
            {1.2m, 54},
            {1.3m, 56},
            {1.5m, 60},
            {1.6m, 62},
            {1.7m, 64},
            {1.8m, 66},
            {1.9m, 68},
            {2.0m, 70},
            {2.2m, 75},
            {2.4m, 80},
            {2.6m, 85},
            {2.8m, 90},
            {3.0m, 100}
        };

        public static decimal CalculatePercentage(int nrRegistrations, int totalAchivedOnScale)
        {
            if (nrRegistrations == 0)
            {
                return 0;
            }

            // Get the avarageResult
            decimal avarageResult = Convert.ToDecimal(totalAchivedOnScale) / Convert.ToDecimal(nrRegistrations);
            avarageResult = Decimal.Round(avarageResult, 1);

            // Get the percentage for the avarage result.
            decimal totalPercentage = 0;
            if (avarageResult != 0)
            {
                totalPercentage = TransformationDictionary.FirstOrDefault(td => td.Key == avarageResult).Value;
                // if the value is not found in the dictionary add the smallest keystep an search again 
                //Example 2.1 is not a declared value => take 2.2 => 75
                if (totalPercentage == 0)
                {
                    totalPercentage = TransformationDictionary.FirstOrDefault(td => td.Key == (avarageResult + 0.1m)).Value;
                }
            }

            return totalPercentage;
        }
    }
}
