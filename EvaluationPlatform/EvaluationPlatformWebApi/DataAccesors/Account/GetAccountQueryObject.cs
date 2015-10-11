using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.DataAccesors.Account
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