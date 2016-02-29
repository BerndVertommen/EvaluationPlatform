﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.StudyPlan.QueryObjects;

namespace EvaluationPlatformLogic.CommandAndQuery.StudyPlan.QueryHandlers
{
    public class StudyPlanQueryHandler : QueryHandler<StudyPlanQueryObject, IEnumerable<StudyPlanInfo>>
    {
        public StudyPlanQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<StudyPlanInfo> Handle(StudyPlanQueryObject queryObject)
        {
            var studyPlans = Database.StudyPlans.ToList();

            return Mapper.Map<IEnumerable<StudyPlanInfo>>(studyPlans);
            // geen ID in studyplaninfo kijken of dit geen probleem geeft
        }
    }
}