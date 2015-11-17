using System;
using System.Windows.Input;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation.Command
{
    public class CreateEvaluationCommand : ICommandObject
    {
        public Guid SchoolYearId { get; set; }
        public Guid EvaluationTemplateId { get; set; }
        public Guid TeacherId { get; set; }
        public DateTime EvaluationDate { get; set; }
        public Guid ClassId { get; set; }
    }
}
