using System;
using EvaluationPlatformDataTransferModels.InformationModels.Account;

namespace EvaluationPlatformDataTransferModels.InformationModels
{
    public class EditChangeHistoryRecordInfo
    {
        public DateTime ChangedAt { get; private set; }
        public string ChangeState { get; private set; }
        public AccountInfo ChangedBy { get; private set; }

        public EditChangeHistoryRecordInfo()
        {

        }
    }
}