using System;
using System.Collections.Generic;

namespace EvaluationPlatformDomain.Models
{
    public  class Evaluation: Entity
    {
        public virtual Student Student { get; set; }
        public virtual DateTime EvaluationDate { get; set; }
        public virtual Cource Cource { get; set; }
        public virtual ICollection<EvaluationItem> EvaluationItems { get; set; }

        public Evaluation()
        {
            
        }
    }
}