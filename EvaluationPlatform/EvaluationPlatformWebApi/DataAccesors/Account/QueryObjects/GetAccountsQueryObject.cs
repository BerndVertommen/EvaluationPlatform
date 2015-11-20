using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDataTransferModels.InformationModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvaluationPlatformWebApi.DataAccesors.Account.QueryObjects
{
    public class GetAccountsQueryObject : IQueryObject<List<AccountInfo>>
    {
        public GetAccountsQueryObject()
        {

        }
    }
}
