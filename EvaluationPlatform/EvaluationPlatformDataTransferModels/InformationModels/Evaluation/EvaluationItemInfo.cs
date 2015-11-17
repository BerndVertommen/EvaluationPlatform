using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDataTransferModels.InformationModels.Evaluation
{
    public class EvaluationItemInfo
    {
        public GoalInfo Goal { get; set; }

        public int Score { get; set; }

        public string Comment { get; set; }
    }
}
