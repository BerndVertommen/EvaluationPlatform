using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using EvaluationPlatformDomain.Models.BaseEntities;

namespace EvaluationPlatformDomain.Models
{
    public class Evaluation : Entity
    {
        public virtual EvaluationTemplate EvaluationTemplate { get; private set; }
        public virtual Student Student { get; private set; }
        public virtual DateTime EvaluationDate { get; private set; }
        public virtual Course Course { get; private set; }
        public virtual ICollection<EvaluationItem> EvaluationItems { get; private set; }
        public virtual string GeneralComment { get; private set; }
        public virtual Class CreatedForClass { get; private set; }
        public virtual DateTime? LastUpdated { get; private set; }
        public virtual string Description { get; private set; }
        public virtual bool Finished { get; private set; }
        public virtual EditableState EditAbleState { get; private set; } 
       

        // bundle id groups the evaluations made from the same template at the same time
        // usefulle for faster queries where only one column needs to be searched.
        public virtual Guid BundleId { get; private set; }

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

        public Evaluation(string description, EvaluationTemplate evaluationTemplate, Student student, DateTime evaluationDate, Course course, ICollection<EvaluationItem> evaluationItems, string generalComment, Guid bundleId, Class createdForClass)
        {
            Description = description;
            EvaluationTemplate = evaluationTemplate;
            Student = student;
            EvaluationDate = evaluationDate;
            Course = course;
            EvaluationItems = evaluationItems;
            GeneralComment = generalComment;
            BundleId = bundleId;
            CreatedForClass = createdForClass;
            EditAbleState = new EditableState();
        }

        public void SetUpdated(Account.Account account)
        {
            LastUpdated = DateTime.Now;
            CheckFinished();

            if (Finished)
            {
                EditAbleState.SetEditLocked(account);
            }
        }

        
        private void CheckFinished()
        {
            Finished = !EvaluationItems.Any(e => !e.Score.HasValue && e.NotScoredReason == NotScoredReason.NotProvided);
        }


        public void UpdateGeneralcomment(Account.Account account, string generalComment)
        {
            EditAbleState.CheckEditAllowed();

            GeneralComment = generalComment;
            SetUpdated(account);
        }

    }
}