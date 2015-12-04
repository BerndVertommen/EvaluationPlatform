using System;
using System.Collections.Generic;
using System.Linq;
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

            foreach (var subsection in eva.EvaluationTemplate.EvaluationSubSections)
            {
                var evaluationitems = eva.EvaluationItems.Where(e => e.EvaluationSubSection.Id == subsection.Id);

                decimal scorePerSubsection = TotalEvaluationPointsPercategory(evaluationitems, subsection.Weight, eva.Course.Scale);

                result.TotalsPercategory.Add(subsection.Id, scorePerSubsection);
                result.Total += scorePerSubsection;
            }


            return result;
        }

        private static decimal TotalEvaluationPointsPercategory(IEnumerable<EvaluationItem> items, int weight, Scale scale)
        {
            int totalAchieved = items.Sum(e => e.Score).Value;
            int scaleMax = scale?.MaxScore ?? 3;
            int max = items.Count() * scaleMax;

            return Decimal.Divide(totalAchieved, max) * weight;
        }
    }
}
