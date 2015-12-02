using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDataTransferModels.InformationModels.Evaluation
{
    public class EvaluationItemInfo
    {
        public Guid Id { get; set; }

        public EvaluationSubSectionInfo EvaluationSubSection { get; set; }

        public GoalInfo Goal { get; set; }

        public int? Score { get; set; }

        public string Comment { get; set; }

        public virtual int NotScoredReason { get; set; }

    }
}
