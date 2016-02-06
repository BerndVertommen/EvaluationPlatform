using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.PagedQueryResults
{
    public class EvaluationsPagedQueryResult : PagedQueryResult
    {
        public IEnumerable<EvaluationInfo> Evaluations { get; set; }

        public EvaluationsPagedQueryResult(IEnumerable<EvaluationInfo> evaluations,int totalItems)
        {
            Evaluations = evaluations;
            TotalItems = totalItems;
        }
    }
}