﻿using System.CodeDom;
using System.Data.Entity.Infrastructure.Annotations;
using EvaluationPlatformDomain.Models.BaseEntities;

namespace EvaluationPlatformDomain.Models
{
    public class EvaluationItem : Entity
    {
        public virtual Goal Goal { get; set; }

        public virtual int? Score { get; set; }

        public string Comment { get; set; } // commentaar over het punt

        public virtual EvaluationSubSection EvaluationSubSection { get; set; }

        public virtual NotScoredReason NotScoredReason { get; set; }


        public EvaluationItem()
        {

        }

        public EvaluationItem(Goal goal, EvaluationSubSection evaluationSubSection)
        {
            Goal = goal;
            EvaluationSubSection = evaluationSubSection;
        }

        public void Update(string comment, int? score, int notScoredReason)
        {
            Comment = comment;
            if (score.HasValue)
            {
                Score = score;
                NotScoredReason = NotScoredReason.NotProvided;
            }
            else
            {
                NotScoredReason = (NotScoredReason)notScoredReason;
            }
        }
    }
}