using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryDto;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryHandlers
{
    public class PlannedEvaluationBaseInfoQueryHandler : QueryHandler<PlannedEvaluationBaseInfoQueryDto, IEnumerable<EvaluationBaseInfo>>
    {
        public PlannedEvaluationBaseInfoQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<EvaluationBaseInfo> Handle(PlannedEvaluationBaseInfoQueryDto queryObject)
        {
            var teacher = Database.GetTeacherForAccount(queryObject.AccountId);

            var evaluations = teacher.Evaluations.Where(e => e.EvaluationDate > DateTime.Now).GroupBy(e => e.BundleId, (key,group )=> group.First());

            return Mapper.Map<IEnumerable<EvaluationBaseInfo>>(evaluations);
        }
    }
}