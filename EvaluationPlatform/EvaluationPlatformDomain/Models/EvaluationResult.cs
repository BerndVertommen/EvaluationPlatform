using System;
using System.Collections.Generic;
using System.Linq;
using EvaluationPlatformDomain.Calculators;
using EvaluationPlatformDomain.Models.Scales;

namespace EvaluationPlatformDomain.Models
{
    public class EvaluationResult
    {
        public decimal Total { get; set; }
        public Dictionary<Guid, decimal> TotalsPercategory { get; set; }

        public EvaluationResult()
        {
            TotalsPercategory = new Dictionary<Guid, decimal>();
        }

        public static EvaluationResult GetEvaluationResult(Evaluation eva)
        {
            EvaluationResult result = new EvaluationResult();
            var percentageCalculationNeeded = false; // if this bool is set the percentage needs to be recalculated. This happens when a category is completly unscored.

            foreach (var subsection in eva.EvaluationTemplate.EvaluationSubSections)
            {
                var evaluationitems = eva.EvaluationItems.Where(e => e.EvaluationSubSection.Id == subsection.Id);

                int scaleMax = eva.Course.Scale?.MaxScore ?? 3;
                int max = evaluationitems.Count(i => i.Score != null) * scaleMax;

                if (max == 0)
                {
                    percentageCalculationNeeded = true;
                }

                decimal scorePerSubsection = TotalEvaluationPointsPercategory(evaluationitems, subsection.Weight, max);

                result.TotalsPercategory.Add(subsection.Id, scorePerSubsection);
                result.Total += scorePerSubsection;
            }

            if (percentageCalculationNeeded)
            {
                CalculateTotalPercent(eva, result);
            }

            return result;
        }

        private static void CalculateTotalPercent(Evaluation eva, EvaluationResult result)
        {
            // this method is called whe the percentage needs to be recalculated because a categry is completly unscored.
            var scoredCategories =
                eva.EvaluationTemplate.EvaluationSubSections.Where(
                    es =>
                        eva.EvaluationItems.Where(ei => ei.EvaluationSubSection.Id == es.Id)
                            .Any(ei => ei.Score.HasValue));
            if (scoredCategories.Any())
            {
                var totalWeight = scoredCategories.Sum(f => f.Weight);
                result.Total = (result.Total /totalWeight)*100;
            }


        }

        private static decimal TotalEvaluationPointsPercategory(IEnumerable<EvaluationItem> items, int weight, int max)
        {
            int totalAchieved = items.Sum(e => e.Score).Value;

            decimal percentage = KoshResultTransformator.CalculatePercentage(items.Count(i => i.Score.HasValue), totalAchieved); //Kosh related

            return (percentage / 100)*weight; //Kosh related

            //  return totalAchieved == 0 || max  == 0 ?  0 : Decimal.Divide(totalAchieved, max) * weight ; // commented out for kosh
        }
    }
}
