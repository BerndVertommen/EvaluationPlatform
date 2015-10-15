using EvaluationPlatformDomain.Models.Scales;

namespace EvaluationPlatformDomain.Models
{
    public class Course : Entity
    {
        public virtual SchoolYear SchoolYear { get; set; }
        public virtual Teacher PrimaryTeacher { get; set; }// leerkracht die het vak initieel geeft (niet de vervanger)
        public Scale Scale { get; set; } 
        public virtual string Discription { get; set; }

        public Course(string discription, SchoolYear schoolYear, Teacher primaryTeacher, Scale fourPointScale)
        {
            Discription = discription;
            SchoolYear = schoolYear;
            PrimaryTeacher = primaryTeacher;
            Scale = fourPointScale;
        }
    }
}