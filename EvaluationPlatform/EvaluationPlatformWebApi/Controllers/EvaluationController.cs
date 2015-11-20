using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformWebApi.Authentication;
using EvaluationPlatformWebApi.DataAccesors.Evaluation;
using EvaluationPlatformWebApi.DataAccesors.Evaluation.Command;
using EvaluationPlatformWebApi.DataAccesors.EvaluationTemplates;

namespace EvaluationPlatformWebApi.Controllers
{
    [RoutePrefix("api/evaluation")]
    public class EvaluationController : BaseWebApiController
    {
        private readonly IQueryProccesor _queryProccesor;
        private readonly ICommandProcessor _commandProcessor;

        public EvaluationController(IQueryProccesor queryProccesor, ICommandProcessor commandProcessor)
        {
            _queryProccesor = queryProccesor;
            _commandProcessor = commandProcessor;

        }

    }
}