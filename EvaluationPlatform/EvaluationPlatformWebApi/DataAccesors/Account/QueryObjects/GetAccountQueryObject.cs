using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Account.QueryObjects
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