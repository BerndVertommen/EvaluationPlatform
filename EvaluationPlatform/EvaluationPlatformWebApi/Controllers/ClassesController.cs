using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformWebApi.DataAccesors.Class;
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

        [Route("test")]
        [HttpGet]
        public ClassViewInfo GetClassViewInfo()
        {
            return _queryProccesor.Execute(new ClassViewInfoQueryObject("1NF", new SchoolYear(2015, 2016)));
        }
    }
}
