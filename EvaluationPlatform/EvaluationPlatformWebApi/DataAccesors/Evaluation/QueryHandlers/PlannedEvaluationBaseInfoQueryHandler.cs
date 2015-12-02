using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.BaseInfoModels;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformWebApi.DataAccesors.Evaluation.QueryObjects;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation.QueryHandlers
{
    public class PlannedEvaluationBaseInfoQueryHandler : QueryHandler<PlannedEvaluationBaseInfoQueryObject, IEnumerable<EvaluationBaseInfo>>
    {
        public PlannedEvaluationBaseInfoQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<EvaluationBaseInfo> Handle(PlannedEvaluationBaseInfoQueryObject queryObject)
        {
            var teacher = Database.GetTeacherForAccount(queryObject.AccountId);

            var evaluations = teacher.Evaluations.Where(e => e.EvaluationDate > DateTime.Now).GroupBy(e => e.BundleId, (key,group )=> group.First());

            return Mapper.Map<IEnumerable<EvaluationBaseInfo>>(evaluations);
        }
    }
}