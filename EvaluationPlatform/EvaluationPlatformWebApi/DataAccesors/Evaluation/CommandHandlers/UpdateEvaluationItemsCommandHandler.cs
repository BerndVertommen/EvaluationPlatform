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
            var evaluation = Database.Evaluations.FirstOrDefault(e => e.Id == commandObject.Id);

            foreach (var evaluationInfo in commandObject.EvaluationItems)
            {
                var evaluationitem = evaluation.EvaluationItems.FirstOrDefault(e => e.Id == evaluationInfo.Id);
                
                if(evaluationitem == null) { break;}

                evaluationitem.Update(evaluationInfo.Comment, evaluationInfo.Score);
            }
        }
    }
}