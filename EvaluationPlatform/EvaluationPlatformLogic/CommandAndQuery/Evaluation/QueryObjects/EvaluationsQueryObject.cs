using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryObjects
{
    public class EvaluationsQueryObject: IQueryObject<IEnumerable<EvaluationInfo>>
    {
        public IEnumerable<Guid> Ids { get; set; }

        public EvaluationsQueryObject(IEnumerable<Guid> ids)
        {
            Ids = ids;
        }
    }
}