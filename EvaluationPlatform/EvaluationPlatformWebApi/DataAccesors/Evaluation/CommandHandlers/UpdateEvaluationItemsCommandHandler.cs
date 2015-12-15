using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformWebApi.DataAccesors.Evaluation.Command;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation.CommandHandlers
{
    public class UpdateEvaluationItemsCommandHandler : CommandHandler<UpdateEvaluationItemsCommandObject>
    {
        public UpdateEvaluationItemsCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(UpdateEvaluationItemsCommandObject commandObject)
        {
            var evaluation = Database.Evaluations.FirstOrDefault(e => e.Id == commandObject.EvaluationInfo.Id);

            if (evaluation == null)
            {
                throw new NullReferenceException("Evaluation not found.");
            }

            foreach (var evaluationItem in commandObject.EvaluationInfo.EvaluationItems)
            {
                var evaluationitem = evaluation.EvaluationItems.FirstOrDefault(e => e.Id == evaluationItem.Id);
                
                if(evaluationitem == null) { break;}

                evaluationitem.Update(evaluationItem.Comment, evaluationItem.Score, evaluationItem.NotScoredReason);
            }

            evaluation.UpdateGeneralcomment(commandObject.EvaluationInfo.GeneralComment);

            //evaluation.SetUpdated();
        }
    }
}