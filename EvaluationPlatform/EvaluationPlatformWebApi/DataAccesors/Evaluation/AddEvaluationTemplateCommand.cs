using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Windows.Input;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation
{
    public class AddEvaluationTemplateCommand : ICommandObject
    {
        public EvaluationTemplateInfo EvaluationTemplateInfo { get; set; }
        public Guid? AccountId { get; set; }

        public AddEvaluationTemplateCommand(EvaluationTemplateInfo evaluationTemplateInfo, Guid? accountId)
        {
            EvaluationTemplateInfo = evaluationTemplateInfo;
            AccountId = accountId;
        }
    }
}