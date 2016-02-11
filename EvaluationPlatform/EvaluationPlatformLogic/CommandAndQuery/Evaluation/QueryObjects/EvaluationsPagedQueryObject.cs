using System;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.PagedQueryResults;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryObjects
{
    public class EvaluationsPagedQueryObject : PagedQueryObject<EvaluationsPagedQueryResult>
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? Finished { get; set; }
        public Guid? ClassId { get; set; }
        public Guid? CourseId { get; set; }
        public string StudentFirstname { get; set; }
        public string StudentLastname { get; set; }
      

        public EvaluationsPagedQueryObject(int? page, int? itemCount, DateTime? startDate, DateTime? endDate, bool? finished, Guid? classId, Guid? courseId, string studentFirstname, string studentLastname) : base(page, itemCount)
        {
            StartDate = startDate;
            EndDate = endDate;
            Finished = finished;
            ClassId = classId;
            CourseId = courseId;
            StudentFirstname = studentFirstname;
            StudentLastname = studentLastname;
           
        }

        //public EvaluationsPagedQueryObject(DateTime? startDate, DateTime? endDate, bool? finished, Guid? classId, Guid? courseId, int? page = null, int? itemCount = null):base(page,itemCount)
        //{
        //    StartDate = startDate;
        //    EndDate = endDate;
        //    Finished = finished;
        //    ClassId = classId;
        //    CourseId = courseId;
        //}

    }
}