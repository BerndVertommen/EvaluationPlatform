using System.Collections.Generic;

namespace EvaluationPlatformDomain.Models
{
    public class GeneralGoal : Entity // Leerplandoel
    {
        public int GoalNumber { get; set; }
        public virtual string Discription { get; set; }
        public virtual ICollection<Goal> Goals{ get; } = new List<Goal>();

        public GeneralGoal(int goalNumber, string discription)
        {
            GoalNumber = goalNumber;
            Discription = discription;
        }

        public GeneralGoal(int goalNumber, string discription, IEnumerable<Goal> goals) : this (goalNumber, discription)
        {
            foreach (Goal goal in goals)
            {
                Goals.Add(goal);
            }
        }

        public void AddGoal(Goal goal)
        {
            Goals.Add(goal);
        }
    }
}