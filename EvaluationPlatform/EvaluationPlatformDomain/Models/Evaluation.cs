using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace EvaluationPlatformDomain.Models
{
    public class Evaluation : Entity
    {
        public virtual EvaluationTemplate EvaluationTemplate { get; set; }
        public virtual Student Student { get; set; }
        public virtual DateTime EvaluationDate { get; set; }
        public virtual Course Course { get; set; }
        public virtual ICollection<EvaluationItem> EvaluationItems { get; set; }
        public virtual string GeneralComment { get; private set; }
        public virtual Class CreatedForClass { get; private set; }
        public virtual DateTime? LastUpdated { get; private set; }

        public virtual bool Finished { get; private set; }

        // bundle id groups the evaluations made from the same template at the same time
        // usefulle for faster queries where only one column needs to be searched.
        public virtual Guid BundleId { get; private set; }

        [NotMapped]
        public string Description => EvaluationTemplate.Description; //c#6 auto met property getter.

        [NotMapped]
        public EvaluationResult Result
        {
            get
            {
                if (!Finished)
                {
                    return null;
                }

                return EvaluationResult.GetEvaluationResult(this);
            }
        }


        public Evaluation()
        {

        }

        public Evaluation(EvaluationTemplate evaluationTemplate, Student student, DateTime evaluationDate, Course course, ICollection<EvaluationItem> evaluationItems, string generalComment, Guid bundleId, Class createdForClass)
        {
            EvaluationTemplate = evaluationTemplate;
            Student = student;
            EvaluationDate = evaluationDate;
            Course = course;
            EvaluationItems = evaluationItems;
            GeneralComment = generalComment;
            BundleId = bundleId;
            CreatedForClass = createdForClass;
        }

        public void SetUpdated()
        {
            LastUpdated = DateTime.Now;
            CheckFinished();
        }

        
        private void CheckFinished()
        {
            Finished = !EvaluationItems.Any(e => !e.Score.HasValue && e.NotScoredReason == NotScoredReason.NotProvided);
        }


    }
}