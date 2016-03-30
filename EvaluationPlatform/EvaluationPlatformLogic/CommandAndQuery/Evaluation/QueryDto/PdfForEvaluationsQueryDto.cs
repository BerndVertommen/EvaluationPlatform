using System;
using System.Collections.Generic;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.Models.File;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryDto
{
    public class PdfForEvaluationsQueryDto : IQueryDto<FileRepresentationModel>
    {
        public IEnumerable<Guid> EvaluationIds { get; set; }
        public string Filename { get; set; }

    }
}
