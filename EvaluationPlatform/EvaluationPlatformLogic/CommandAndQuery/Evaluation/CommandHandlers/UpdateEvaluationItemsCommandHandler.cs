﻿using System;
using System.Linq;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.CommandDto;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.CommandHandlers
{
    public class UpdateEvaluationItemsCommandHandler : CommandHandler<UpdateEvaluationItemsCommandDto>
    {

        public UpdateEvaluationItemsCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(UpdateEvaluationItemsCommandDto commandObject)
        {
            var evaluation = Database.Evaluations.FirstOrDefault(e => e.Id == commandObject.EvaluationInfo.Id);
            var executor = Database.Accounts.FirstOrDefault(a => a.Id == commandObject.ExecutingAccountId);

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

            evaluation.UpdateGeneralcomment(executor, commandObject.EvaluationInfo.GeneralComment);

            //evaluation.SetUpdated();
        }
    }
}