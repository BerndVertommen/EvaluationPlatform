using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Account.QueryDto
{
    public class GetAccountQueryDto : IQueryDto<EvaluationPlatformDomain.Models.Account.Account>
    {
        public string Username { get; set; }

        public GetAccountQueryDto(string username)
        {
            Username = username;
        }
    }
}