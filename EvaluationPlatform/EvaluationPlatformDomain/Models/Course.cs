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
        public Scale Scale { get; set; } 
        public virtual string Discription { get; set; }
        public virtual StudyPlan StudyPlan { get; set; }

        [NotMapped]
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

        public Course(string discription, SchoolYear schoolYear, Teacher primaryTeacher, Scale fourPointScale, StudyPlan studyPlan)
        {
            Discription = discription;
            SchoolYear = schoolYear;
            PrimaryTeacher = primaryTeacher;
            Scale = fourPointScale;
            StudyPlan = studyPlan;
        }
    }
}