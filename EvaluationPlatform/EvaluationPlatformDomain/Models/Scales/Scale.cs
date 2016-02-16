namespace EvaluationPlatformDomain.Models.Scales
{
    public class Scale : Entity, IScale
    {
        public int MinScore { get; protected set; }
        public int MaxScore { get; protected set; }
        public string Description { get; set; }

        public Scale()
        {
            
        }

        public Scale(int minScore, int maxScore, string description)
        {
            MinScore = minScore;
            MaxScore = maxScore;
            Description = description;
        }
    }
}
