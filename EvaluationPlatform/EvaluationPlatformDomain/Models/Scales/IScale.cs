namespace EvaluationPlatformDomain.Models.Scales
{
    public interface IScale
    {
        int MinScore { get; }
        int MaxScore { get; }

        string Discription { get; set; }
    }
}
