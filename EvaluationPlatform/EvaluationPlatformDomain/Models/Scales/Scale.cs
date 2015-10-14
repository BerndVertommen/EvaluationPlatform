namespace EvaluationPlatformDomain.Models.Scales
{
    public class Scale : Entity, IScale
    {
        public int MinScore { get; protected set; }
        public int MaxScore { get; protected set; }
        public string Discription { get; set; }

        public Scale(int minScore, int maxScore, string discription)
        {
            MinScore = minScore;
            MaxScore = maxScore;
            Discription = discription;
        }
    }
}
