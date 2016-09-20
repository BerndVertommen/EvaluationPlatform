using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDomain.Models.BaseEntities;

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

        public void RemoveGeneralGoal(Guid generalGoalId)
        {
            var generalGoal = GeneralGoals.FirstOrDefault(g => g.Id == generalGoalId);

            if (generalGoal != null && generalGoal.Goals.Any())
            {
                throw new InvalidOperationException("Het leerplandoel kan niet worden verwijderd. Er zijn reeds lesdoelen aan gekoppeld.");
            }

            GeneralGoals.Remove(generalGoal);
        }
    }
}
