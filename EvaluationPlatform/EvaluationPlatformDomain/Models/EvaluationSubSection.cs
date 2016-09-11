using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using EvaluationPlatformDomain.Models.BaseEntities;

namespace EvaluationPlatformDomain.Models
{
    public class EvaluationSubSection : Entity
    {
        public string Description { get; set; }

        [Range(1,100)]
        public int  Weight { get; set; }

        public virtual ICollection<Goal> Goals { get; set; }

        public int SequenceNumber { get; set; }

        public EvaluationSubSection()
        {
            
        }

        public EvaluationSubSection(string description, int weight, ICollection<Goal> goals, int sequenceNumber)
        {
            Description = description;
            Weight = weight;
            Goals = goals;
            SequenceNumber = sequenceNumber;
        }

    }
}