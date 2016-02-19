using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using EvaluationPlatformDomain.Models.Scales;

namespace EvaluationPlatformDomain.Models
{
    public class Course : Entity
    {
        public virtual SchoolYear SchoolYear { get; set; }
        public virtual Teacher PrimaryTeacher { get; set; }// leerkracht die het vak initieel geeft (niet de vervanger)
        public virtual Scale Scale { get; set; } 
        public virtual string Description { get; set; }
        public virtual StudyPlan StudyPlan { get; set; }
        public virtual ICollection<Teacher> Teachers { get; } = new List<Teacher>();


        // do not add to this colelction property exists to let EF generate coupling table
        public virtual ICollection<Class> Classes { get; private set; }
       
        [NotMapped] // EntityFramework ignores this
        public List<Goal> GoalsForCourse
        {
            get
            {
               return StudyPlan.GeneralGoals.SelectMany(g => g.Goals).ToList();
            } 
            
        } 

        public Course()
        {
            
        }

        public Course(string description, SchoolYear schoolYear, Teacher primaryTeacher, Scale fourPointScale, StudyPlan studyPlan)
        {
            Description = description;
            SchoolYear = schoolYear;
            PrimaryTeacher = primaryTeacher;
            Scale = fourPointScale;
            StudyPlan = studyPlan;
        }
    }
}