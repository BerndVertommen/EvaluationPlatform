using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation.Command
{
    public class UpdateEvaluationItemsCommandObject : ICommandObject
    {
        public Guid Id { get; set; }

        public ICollection<EvaluationItemInfo> EvaluationItems { get; set; }

        public UpdateEvaluationItemsCommandObject(Guid id, ICollection<EvaluationItemInfo> evaluationItems)
        {
            Id = id;
            EvaluationItems = evaluationItems;
        }
    }
}