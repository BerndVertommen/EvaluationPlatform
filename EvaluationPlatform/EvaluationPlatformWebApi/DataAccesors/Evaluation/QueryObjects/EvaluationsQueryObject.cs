using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation.QueryObjects
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