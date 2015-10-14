using EvaluationPlatformDomain.Models.Scales;

namespace EvaluationPlatformDomain.Models
{
    public class Cource : Entity
    {
        public virtual SchoolYear SchoolYear { get; set; }
        public virtual Teacher PrimaryTeacher { get; set; } // leerkracht die het vak initieel geeft (niet de vervanger)
        public virtual IScale Scale { get; set; }
        public virtual string Discription { get; set; }

        public Cource(string discription, SchoolYear schoolYear, Teacher primaryTeacher)
        {
            Discription = discription;
            SchoolYear = schoolYear;
            PrimaryTeacher = primaryTeacher;
        }
    }
}