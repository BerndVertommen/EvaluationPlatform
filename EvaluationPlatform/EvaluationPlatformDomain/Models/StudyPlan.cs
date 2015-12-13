using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDomain.Models
{
    public class StudyPlan : Entity // Leerplan
    {
        public virtual string Description { get; set; }
        public virtual ICollection<GeneralGoal> GeneralGoals { get; } = new List<GeneralGoal>();

        public StudyPlan()
        {
            
        }

        public StudyPlan(string description)
        {
            Description = description;
        }

        public void AddGeneralGoal(GeneralGoal generalGoal)
        {
            GeneralGoals.Add(generalGoal);
        }
    }
}
