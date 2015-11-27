using System.Collections.Generic;

namespace EvaluationPlatformDomain.Models
{
    public class EvaluationTemplate : Entity
    {
       public virtual Course Course { get; set; }
        public virtual string Description { get; set; }
        public virtual ICollection<EvaluationSubSection> EvaluationSubSections { get; set; }

        public EvaluationTemplate()
        {
            
        }

        public EvaluationTemplate(Course course, string description, ICollection<EvaluationSubSection> evaluationSubSections)
        {
            Course = course;
            Description = description;
            EvaluationSubSections = evaluationSubSections;
        }
    }
}
