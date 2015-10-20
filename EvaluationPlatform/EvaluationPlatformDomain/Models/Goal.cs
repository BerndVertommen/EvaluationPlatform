namespace EvaluationPlatformDomain.Models
{
    public class Goal : Entity // lesdoel
    {
        public string Discription { get; set; }

        public Goal()
        {
            
        }

        public Goal(string discription)
        {
            Discription = discription;
        }
    }
}