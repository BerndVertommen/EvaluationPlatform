using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformWebApi.DataAccesors.Evaluation.QueryObjects;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation.QueryHandlers
{
    public class EvaluationsQueryHandler : QueryHandler<EvaluationsQueryObject, IEnumerable<EvaluationInfo>>
    {
        public EvaluationsQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<EvaluationInfo> Handle(EvaluationsQueryObject queryObject)
        {
            // check to make query lighter
            if (queryObject.Ids.Count() ==1)
            {
               return GetOneEvaluation(queryObject.Ids.FirstOrDefault());
            }


            var evaluations = Database.Evaluations.Where(e => queryObject.Ids.Any(i => i == e.Id));

            return Mapper.Map<IEnumerable<EvaluationInfo>>(evaluations);
        }

        private IEnumerable<EvaluationInfo> GetOneEvaluation(Guid id)
        {
            var evaluation = Database.Evaluations.FirstOrDefault(e => e.Id == id);

            EvaluationInfo evaluationInfo = Mapper.Map<EvaluationInfo>(evaluation);

            return new List<EvaluationInfo>() { evaluationInfo };
        }
    }
}