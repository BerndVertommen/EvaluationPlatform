using System.Collections.Generic;

namespace EvaluationPlatformDomain.Models
{
    public class Teacher : Entity
    {
        public virtual Person Person { get; protected set; }
        public virtual ICollection<Class> Classes { get; } = new List<Class>(); // c#6 auto initializers
        public virtual ICollection<Evaluation> Evaluations { get; } =new List<Evaluation>();
        public virtual ICollection<Cource> Cources { get; } = new List<Cource>();

        public virtual ICollection<StudyPlan> StudyPlans { get; } = new List<StudyPlan>(); 

        public Teacher(Person person)
        {
            Person = person;
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
