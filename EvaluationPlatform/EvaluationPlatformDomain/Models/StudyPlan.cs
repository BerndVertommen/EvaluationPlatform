using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDomain.Models
{
    public class StudyPlan : Entity // Leerplan
    {
        public virtual ICollection<GeneralGoal> GeneralGoals { get; } = new List<GeneralGoal>();
        public virtual ICollection<Teacher> Teachers { get; } = new List<Teacher>();

        public StudyPlan(string discription): base(discription)
        {
                    
        }

        public void AddGeneralGoal(GeneralGoal generalGoal)
        {
            GeneralGoals.Add(generalGoal);
        }
    }
}
