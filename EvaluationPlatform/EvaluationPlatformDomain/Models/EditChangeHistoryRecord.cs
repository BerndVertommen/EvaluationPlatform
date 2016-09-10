using System;
using EvaluationPlatformDomain.Models.BaseEntities;

namespace EvaluationPlatformDomain.Models
{
    public class EditChangeHistoryRecord : Entity
    {
        public DateTime ChangedAt { get; private set; }
        public ChangeState ChangeState { get; private set; }
        public Account.Account ChangedBy { get; private set; }

        public EditChangeHistoryRecord()
        {
            
        }

        public EditChangeHistoryRecord(ChangeState changeState, Account.Account changedBy)
        {
            ChangeState = changeState;
            ChangedBy = changedBy;
            ChangedAt = DateTime.Now;
        }
    }
}