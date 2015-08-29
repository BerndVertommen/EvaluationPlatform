namespace EvaluationPlatformDomain.Models
{
    public class Cource : Entity
    {
        public virtual SchoolYear SchoolYear { get; set; }
        public virtual Teacher PrimaryTeacher { get; set; } // leerkracht die het vak initieel geeft (niet de vervanger)

        public Cource(string discription, SchoolYear schoolYear, Teacher primaryTeacher):base(discription)
        {
            SchoolYear = schoolYear;
            PrimaryTeacher = primaryTeacher;
        }
    }
}