﻿using System.Collections.Generic;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformWebApi.Authentication;
using EvaluationPlatformWebApi.DataAccesors.General.QueryObjects;

namespace EvaluationPlatformWebApi.Controllers
{
    [RoutePrefix("api/generalInfo")]
    [CustomAutorize(AccountRoleType.UserRole, AccountRoleType.Admin)]
    public class GeneralInfoController : BaseWebApiController
    {
        public GeneralInfoController(IQueryProccesor queryProccesor, ICommandProcessor commandProcessor) : base(commandProcessor,queryProccesor)
        {
            
        }

        [Route("getschoolyears")]
        [HttpGet]
        public IEnumerable<SchoolYearInfo> GetSchoolYears()
        {
            return QueryProccesor.Execute(new GetSchoolYearsQueryObject());
        }
    }
}