﻿using System.CodeDom;
using System.Data.Entity.Infrastructure.Annotations;

namespace EvaluationPlatformDomain.Models
{
    public class EvaluationItem : Entity
    {
        public virtual Goal Goal { get; set; }

        public virtual int? Score{ get; set; }

        public string Comment { get; set; } // commentaar over het punt

        public EvaluationItem()
        {
            
        }

        public EvaluationItem(Goal goal)
        {
            Goal = goal;
        }
    }

   
}