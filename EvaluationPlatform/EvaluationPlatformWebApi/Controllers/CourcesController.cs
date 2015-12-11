using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Routing;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Course;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformWebApi.Authentication;
using EvaluationPlatformWebApi.DataAccesors.Course.QueryObjects;

namespace EvaluationPlatformWebApi.Controllers
{
    [RoutePrefix("api/courses")]
    public class CourcesController : BaseWebApiController
    {
        public CourcesController(IQueryProccesor queryProccesor, ICommandProcessor commandProcessor): base(commandProcessor,queryProccesor)
        {
            
        }

        [CustomAutorize(AccountRoleType.UserRole)]
        [Route("coursesForTeacher")]
        [HttpGet]
        public IEnumerable<CourseViewInfo> CoursesForTeacher()
        {
            Guid teacherId = GetAccountInfo().TeacherId.Value;

            return QueryProccesor.Execute(new CoursesForTeacherQueryObject(teacherId));
        }
    }
}