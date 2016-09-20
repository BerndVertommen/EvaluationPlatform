using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.StudyPlan;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.StudyPlan.QueryDto;

namespace EvaluationPlatformLogic.CommandAndQuery.StudyPlan.QueryHandlers
{
    public class GetStudyPlanInfoQueryHandler : QueryHandler<GetStudyPlanInfoQueryDto, StudyPlanInfo>
    {
        public GetStudyPlanInfoQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override StudyPlanInfo Handle(GetStudyPlanInfoQueryDto queryObject)
        {
            var studyplan = Database.StudyPlans.FirstOrDefault(s => s.Id == queryObject.StudyPlanId);

            return Mapper.Map<StudyPlanInfo>(studyplan);
        }
    }
}
