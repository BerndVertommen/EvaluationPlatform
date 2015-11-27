using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EvaluationPlatformDomain.Models
{
    public class EvaluationSubSection : Entity
    {
        public virtual string Description { get; set; }

        [Range(1,100)]
        public int  Weight { get; set; }

        public virtual ICollection<Goal> Goals { get; set; }

        public EvaluationSubSection()
        {
            
        }

        public EvaluationSubSection(string description, int weight, ICollection<Goal> goals)
        {
            Description = description;
            Weight = weight;
            Goals = goals;
        }

    }
}