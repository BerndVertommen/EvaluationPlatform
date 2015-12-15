using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation.QueryObjects
{
    public class EvaluationsQueryObject : IQueryObject<IEnumerable<EvaluationInfo>>
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool Complete { get; set; }
        public EvaluationPlatformDomain.Models.Class Class { get; set; }
        public EvaluationPlatformDomain.Models.Course Course { get; set; }

        public EvaluationsQueryObject(DateTime? startDate, DateTime? endDate, bool complete, EvaluationPlatformDomain.Models.Class klas, EvaluationPlatformDomain.Models.Course course)
        {
            StartDate = startDate;
            EndDate = endDate;
            Complete = complete;
            Class = klas;
            Course = course;
        }

    }
}