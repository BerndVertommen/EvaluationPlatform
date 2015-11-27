namespace EvaluationPlatformDomain.Models.Scales
{
    public interface IScale
    {
        int MinScore { get; }
        int MaxScore { get; }

        string Description { get; set; }
    }
}
