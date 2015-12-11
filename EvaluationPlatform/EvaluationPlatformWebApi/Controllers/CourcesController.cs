using System;
using System.Collections.Generic;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.InformationModels.Course;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models;
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
        
        [CustomAutorize(AccountRoleType.Admin)]
        [Route("allCourses")]
        [HttpGet]
        public IEnumerable<CourseBaseInfo> AllCourses()
        {
            return QueryProccesor.Execute(new AllCoursesQueryObject(SchoolYear.GetStartYearThisSchoolYear()));
        }

    }
}