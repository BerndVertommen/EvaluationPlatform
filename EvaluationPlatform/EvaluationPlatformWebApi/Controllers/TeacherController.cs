using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.InformationModels.Teacher;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Teacher.CommandDto;
using EvaluationPlatformLogic.CommandAndQuery.Teacher.QueryDto;
using EvaluationPlatformWebApi.Authentication;

namespace EvaluationPlatformWebApi.Controllers
{
    [RoutePrefix("api/teacher")]
    [CustomAutorize(AccountRoleType.UserRole , AccountRoleType.Admin)]
    public class TeacherController : BaseWebApiController
    {
        public TeacherController(ICommandProcessor commandProcessor, IQueryProccesor queryProccesor) : base(commandProcessor,queryProccesor)
        {
            
        }
        
        [CustomAutorize(AccountRoleType.Admin)]
        [Route("addCourse")]
        [HttpPost]
        public HttpResponseMessage AddCourse(AddCourseToTeacherCommandDto command)
        {
            CommandProcessor.Execute(command);

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [CustomAutorize(AccountRoleType.Admin)]
        [Route("teachers")]
        [HttpGet] // change to post when passing query object in future
        public IEnumerable<TeacherInfo> GetTeachers()
        {
            // use query clientside in the future

            return QueryProccesor.Execute(new TeachersQueryDto());
        }

        [CustomAutorize(AccountRoleType.Admin)]
        [Route("addClass")]
        [HttpPost] 
        public HttpResponseMessage AddClass(AddClassToTeacherCommandDto addClassToTeacherCommand)
        {
            CommandProcessor.Execute(addClassToTeacherCommand);

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
        
    }
}