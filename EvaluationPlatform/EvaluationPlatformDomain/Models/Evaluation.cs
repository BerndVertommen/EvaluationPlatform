using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

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

        // bundle id groups the evaluations made from the same template at the same time
        // usefulle for faster queries where only one column needs to be searched.
        public virtual Guid BundleId { get; private set; } 

        [NotMapped]
        public string Discription => EvaluationTemplate.Discription;

        public Evaluation()
        {
            
        }

        public Evaluation(EvaluationTemplate evaluationTemplate, Student student, DateTime evaluationDate, Course course, ICollection<EvaluationItem> evaluationItems, string generalComment, Guid bundleId)
        {
            EvaluationTemplate = evaluationTemplate;
            Student = student;
            EvaluationDate = evaluationDate;
            Course = course;
            EvaluationItems = evaluationItems;
            GeneralComment = generalComment;
            BundleId = bundleId;
        }

    }
}