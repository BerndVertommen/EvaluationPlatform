using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDataTransferModels.InformationModels
{
    public class AccountInfo
    {
        public Guid? TeacherId { get; set; }
        public PersonInfo Person { get; set; }

        public AccountInfo()
        {
            
        }
    }
}
