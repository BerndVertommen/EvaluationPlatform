using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Teacher;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformWebApi.Authentication;
using EvaluationPlatformWebApi.DataAccesors.Teacher.Command;
using EvaluationPlatformWebApi.DataAccesors.Teacher.QueryObject;

namespace EvaluationPlatformWebApi.Controllers
{
    [RoutePrefix("api/teacher")]
    public class TeacherController : BaseWebApiController
    {
        public TeacherController(ICommandProcessor commandProcessor, IQueryProccesor queryProccesor) : base(commandProcessor,queryProccesor)
        {
            
        }
        
        [CustomAutorize(AccountRoleType.Admin)]
        [Route("addCourse")]
        [HttpPost]
        public HttpResponseMessage AddCourse(AddCourseToTeacherCommand command)
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

            return QueryProccesor.Execute(new TeachersQueryObject());
        }

        [CustomAutorize(AccountRoleType.Admin)]
        [Route("addClass")]
        [HttpPost] 
        public HttpResponseMessage AddClass(AddClassToTeacherCommand addClassToTeacherCommand)
        {
            CommandProcessor.Execute(addClassToTeacherCommand);

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
        
    }
}