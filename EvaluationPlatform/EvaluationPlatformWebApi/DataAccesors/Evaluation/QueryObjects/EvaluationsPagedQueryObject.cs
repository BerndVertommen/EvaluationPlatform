using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformWebApi.DataAccesors.Evaluation.PagedQueryResults;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation.QueryObjects
{
    public class EvaluationsPagedQueryObject : PagedQueryObject<EvaluationsPagedQueryResult>
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? Finished { get; set; }
        public Guid? ClassId { get; set; }
        public Guid? CourseId { get; set; }

        public EvaluationsPagedQueryObject(DateTime? startDate, DateTime? endDate, bool? finished, Guid? classId, Guid? courseId, int? page = null, int? itemCount = null):base(page,itemCount)
        {
            StartDate = startDate;
            EndDate = endDate;
            Finished = finished;
            ClassId = classId;
            CourseId = courseId;
        }

    }
}