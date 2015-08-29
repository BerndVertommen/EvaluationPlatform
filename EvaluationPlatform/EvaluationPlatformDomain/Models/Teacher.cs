using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformDomain.Models
{
    public class Teacher : Person
    {
        public virtual ICollection<Class> Classes { get; } = new List<Class>(); // c#6 auto initializers
        public virtual ICollection<Evaluation> Evaluations { get; } =new List<Evaluation>();
        public virtual ICollection<Cource> Cources { get; } = new List<Cource>();
        public virtual ICollection<StudyPlan> StudyPlans { get; } = new List<StudyPlan>(); 

        public Teacher(string firstName , string lastName):base(firstName,lastName) 
        {

        }

        public void AddClass(Class toAddClass)
        {
            Classes.Add(toAddClass);
        }

        public void AddEvaluation(Evaluation evaluation)
        {
            Evaluations.Add(evaluation);
        }

        public void AddCource(Cource cource)
        {
            Cources.Add(cource);
        }

        public void AddStudypPlan(StudyPlan studyPlan)
        {
            StudyPlans.Add(studyPlan);
        }
    }
}
