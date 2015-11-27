using System.Collections.Generic;

namespace EvaluationPlatformDomain.Models
{
    public class GeneralGoal : Entity // Leerplandoel
    {
        public int GoalNumber { get; set; }
        public virtual string Description { get; set; }
        public virtual ICollection<Goal> Goals{ get; } = new List<Goal>();

        public GeneralGoal()
        {
            
        }

        public GeneralGoal(int goalNumber, string description)
        {
            GoalNumber = goalNumber;
            Description = description;
        }

        public GeneralGoal(int goalNumber, string description, IEnumerable<Goal> goals) : this (goalNumber, description)
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