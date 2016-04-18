using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Class.CommandDto;
using EvaluationPlatformLogic.CommandAndQuery.Class.QueryDto;
using EvaluationPlatformLogic.CsvProcessing.Processors.Student;
using EvaluationPlatformLogic.CsvProcessing.ResultHandlers.Student;
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
        public IEnumerable<ClassInfo> ClassesForCourse(GuidDto guidDto)
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
            return QueryProccesor.Execute(new ClassesAvailableForTeacherQueryDto(guidDto.Id));
        }

        [CustomAutorize(AccountRoleType.Admin)]
        [Route("uploadClassCsv/{schoolYearID}")]
        [HttpPost]
        public HttpResponseMessage UploadClassCsv(string schoolYearID)
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return new HttpResponseMessage(HttpStatusCode.NoContent);
            }

            if (HttpContext.Current.Request.Files.Count > 0)
            {
                try
                {
                    Stream stream = HttpContext.Current.Request.Files[0].InputStream;
                    //this.Request.Content.ReadAsStreamAsync();
                    //task.Wait();
                    //Stream stream = task.Result;

                    TextReader textReader = new StreamReader(stream);

                    CommandProcessor.Execute(new UploadClassCsvCommandDto(textReader, new Guid(schoolYearID)));
                }
                catch (Exception)
                {
                    return new HttpResponseMessage(HttpStatusCode.InternalServerError);
                }
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [CustomAutorize(AccountRoleType.Admin)]
        [Route("allClasses")]
        [HttpGet]
        public IEnumerable<ClassInfo> AllClasses()
        {
            return QueryProccesor.Execute(new AllClassesDto(SchoolYear.GetStartYearThisSchoolYear()));
        }

        [CustomAutorize(AccountRoleType.Admin)]
        [Route("createClass")]
        [HttpPost]
        public HttpResponseMessage CreateClass(CreateClassInfo createClassInfo)
        {
            CommandProcessor.Execute(new CreateClassCommandDto(createClassInfo));

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
        
    }
}
