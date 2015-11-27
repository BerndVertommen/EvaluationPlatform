namespace EvaluationPlatformDomain.Models
{
    public class Goal : Entity // lesdoel
    {
        public string Description { get; set; }

        public Goal()
        {
            
        }

        public Goal(string description)
        {
            Description = description;
        }
    }
}