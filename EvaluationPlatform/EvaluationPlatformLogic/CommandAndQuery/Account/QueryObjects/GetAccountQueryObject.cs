using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Account.QueryObjects
{
    public class GetAccountQueryObject : IQueryObject<EvaluationPlatformDomain.Models.Account.Account>
    {
        public string Username { get; set; }

        public GetAccountQueryObject(string username)
        {
            Username = username;
        }
    }
}