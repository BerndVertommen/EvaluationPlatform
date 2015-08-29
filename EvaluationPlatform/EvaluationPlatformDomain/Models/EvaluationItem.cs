using System.CodeDom;

namespace EvaluationPlatformDomain.Models
{
    public class EvaluationItem : Entity
    {
        public Goal Goal { get; set; }

        public EvaluationItem(Goal goal)
        {
            Goal = goal;
        }
    }
}