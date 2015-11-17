using System.Collections.Generic;

namespace EvaluationPlatformDomain.Models
{
    public class EvaluationTemplate : Entity
    {
       public virtual Course Course { get; set; }
        public virtual string Discription { get; set; }
        public virtual ICollection<EvaluationSubSection> EvaluationSubSections { get; set; }

        public EvaluationTemplate()
        {
            
        }

        public EvaluationTemplate(Course course, string discription, ICollection<EvaluationSubSection> evaluationSubSections)
        {
            Course = course;
            Discription = discription;
            EvaluationSubSections = evaluationSubSections;
        }
    }
}
