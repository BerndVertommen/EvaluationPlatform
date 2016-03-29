using System;
using System.Collections.Generic;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Class.QueryDto;
using EvaluationPlatformWebApi.Authentication;

namespace EvaluationPlatformWebApi.Controllers
{
    [RoutePrefix("api/class")]
    [CustomAutorize(AccountRoleType.UserRole, AccountRoleType.Admin)]
    public class ClassesController : BaseWebApiController
    {
        public ClassesController(IQueryProccesor queryProccesor, ICommandProcessor commandProcessor) : base(commandProcessor, queryProccesor)
        {
        }

        [Route("classesForTeacher")]
        [HttpGet]
        public IEnumerable<ClassInfo> ClassesForTeacher()
        {
            var accountInfo = GetAccountInfo();

            if (!accountInfo.TeacherId.HasValue)
            {
                throw new NullReferenceException();
            }

            return QueryProccesor.Execute(new ClassesForTeacherQueryDto(accountInfo.TeacherId.Value));
        }


        [Route("classesForCourse")]
        [HttpPost]
        public IEnumerable<ClassInfo> ClassesForCourse( GuidDto guidDto)
        {
            //var guid = Guid.Parse(courseId);
            return QueryProccesor.Execute(new ClassesForCourseQueryDto(guidDto.Id));
        }

        [CustomAutorize(AccountRoleType.Admin)]
        [Route("availableClassesForTeacher")]
        [HttpPost]
        public IEnumerable<ClassBaseInfo> AvailableClassesForTeacher(GuidDto guidDto)
        {
            //var guid = Guid.Parse(courseId);
            return QueryProccesor.Execute(new ClassesAvailableForTeacherQueryObject(guidDto.Id));
        }
        
    }
}
