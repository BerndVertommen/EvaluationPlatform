using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformWebApi.Models;

namespace EvaluationPlatformWebApi.Controllers
{
    [RoutePrefix("api/class")]
    public class ClassesController : ApiController
    {
        private readonly ICommandProcessor _commandProcessor;
        private readonly IQueryProccesor _queryProccesor;

        public ClassesController(ICommandProcessor commandProcessor, IQueryProccesor queryProccesor)
        {
            _commandProcessor = commandProcessor;
            _queryProccesor = queryProccesor;
        }

        [HttpGet]
        public ClassViewInfo GetClassViewInfo()
        {
            return null;
        }
    }


}
