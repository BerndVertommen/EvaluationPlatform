using System;
using System.Collections.Generic;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.InformationModels.Course;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Course.QueryObjects;
using EvaluationPlatformWebApi.Authentication;

namespace EvaluationPlatformWebApi.Controllers
{
    [RoutePrefix("api/courses")]
    [CustomAutorize(AccountRoleType.UserRole, AccountRoleType.Admin)]
    public class CourcesController : BaseWebApiController
    {
        public CourcesController(IQueryProccesor queryProccesor, ICommandProcessor commandProcessor): base(commandProcessor,queryProccesor)
        {
            
        }

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