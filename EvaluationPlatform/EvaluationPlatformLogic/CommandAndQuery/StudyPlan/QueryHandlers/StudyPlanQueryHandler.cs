using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.StudyPlan;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.StudyPlan.QueryDto;

namespace EvaluationPlatformLogic.CommandAndQuery.StudyPlan.QueryHandlers
{
    public class StudyPlanQueryHandler : QueryHandler<StudyPlanQueryDto, IEnumerable<StudyPlanInfo>>
    {
        public StudyPlanQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<StudyPlanInfo> Handle(StudyPlanQueryDto queryObject)
        {
            var studyPlans = Database.StudyPlans.ToList();

            return Mapper.Map<IEnumerable<StudyPlanInfo>>(studyPlans);
            // geen ID in studyplaninfo kijken of dit geen probleem geeft
        }
    }
}
