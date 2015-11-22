using System;
using System.Collections.Generic;

namespace EvaluationPlatformDomain.Models
{
    public  class Evaluation: Entity
    {
        public virtual EvaluationTemplate EvaluationTemplate { get; set; }
        public virtual Student Student { get; set; }
        public virtual DateTime EvaluationDate { get; set; }
        public virtual Course Course { get; set; }
        public virtual ICollection<EvaluationItem> EvaluationItems { get; set; }
        public virtual string GeneralComment { get; set; }  
        
        public Evaluation()
        {
            
        }

        public Evaluation(EvaluationTemplate evaluationTemplate, Student student, DateTime evaluationDate, Course course, ICollection<EvaluationItem> evaluationItems, string generalComment)
        {
            EvaluationTemplate = evaluationTemplate;
            Student = student;
            EvaluationDate = evaluationDate;
            Course = course;
            EvaluationItems = evaluationItems;
            GeneralComment = generalComment;
        }
    }
}