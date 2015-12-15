using System;
using System.Collections.Generic;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDataTransferModels.InformationModels.EvaluationItem;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation.Command
{
    public class UpdateEvaluationItemsCommandObject : ICommandObject
    {
        public EvaluationInfo EvaluationInfo { get; set; }

        public UpdateEvaluationItemsCommandObject(EvaluationInfo evaluationInfo)
        {
            EvaluationInfo = evaluationInfo;
        }
    }
}