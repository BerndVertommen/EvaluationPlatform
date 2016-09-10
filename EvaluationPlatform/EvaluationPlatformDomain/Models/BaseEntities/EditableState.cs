using System;
using System.Collections.Generic;

namespace EvaluationPlatformDomain.Models.BaseEntities
{
    public class EditableState : Entity
    {
        public virtual ICollection<EditChangeHistoryRecord> EditChangeHistoryRecords{ get; private set; } = new List<EditChangeHistoryRecord>();
        public EditState EditState { get; private set; }


        public bool CanEdit
        {
            get { return EditState == EditState.Editable; }
        }

        public void SetEditable(Account.Account Executor)
        {
            if (EditState == EditState.Editable )
            {
                throw new InvalidOperationException("De Status is reeds ingesteld op editeerbaar.");
            }

            SetState(EditState.Editable, Executor);
            
       }

        public void SetEditLocked(Account.Account Executor)
        {
            if (EditState == EditState.EditLocked)
            {
                throw new InvalidOperationException("De Status is reeds ingesteld op niet editeerbaar.");
            }

          SetState(EditState.EditLocked, Executor);
        }

        /// <summary>
        /// This method should be used when editing properties of the drived class.
        /// </summary>
        public void CheckEditAllowed()
        {
            if (EditState == EditState.EditLocked)
            {
                throw new InvalidOperationException($"Edit is not allwed: {EditState}");
            }
        }

        private void AddRecordToHistory(EditState editState, Account.Account executor)
        {
            ChangeState changeState;

            switch (editState)
            {
                case EditState.Editable:
                    changeState = ChangeState.Unlocked;
                    break;
                case EditState.EditLocked:
                    changeState = ChangeState.Locked;
                    break;
                default:
                    throw new InvalidOperationException("EditState is not defined.");
            }

            EditChangeHistoryRecords.Add(new EditChangeHistoryRecord(changeState, executor));
        }

        private void SetState(EditState editState, Account.Account executor)
        {
            EditState = editState;
            AddRecordToHistory(editState, executor);
        }
    }
}
