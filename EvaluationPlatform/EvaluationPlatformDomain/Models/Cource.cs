namespace EvaluationPlatformDomain.Models
{
    public class Cource : Entity
    {
        public virtual SchoolYear SchoolYear { get; set; }
        public virtual Teacher PrimaryTeacher { get; set; }

        public Cource()
        {
            
        }
    }
}