using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.DataTransferModels;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryDto
{
    public class EvaluationTotalsForClassOverviewQueryDto : IQueryDto<IEnumerable<EvaluationTotalsForClassOverview>>
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public Guid? ClassId { get; set; }
        public Guid? CourseId { get; set; }
        public string Description { get; set; }
        
    }
}
