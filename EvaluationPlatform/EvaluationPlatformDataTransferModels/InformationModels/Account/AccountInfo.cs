using System;

namespace EvaluationPlatformDataTransferModels.InformationModels.Account
{
    public class AccountInfo
    {
        public Guid? TeacherId { get; set; }
        public PersonInfo Person { get; set; }
        public Guid? Id { get; set; }
        public bool IsAdministrator { get; set; }

        public AccountInfo()
        {
            
        }
    }
}
