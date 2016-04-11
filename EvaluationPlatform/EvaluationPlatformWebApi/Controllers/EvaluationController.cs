using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDomain.Models.Authentication;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.CommandDto;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.PagedQueryResults;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryDto;
using EvaluationPlatformLogic.Models.File;
using EvaluationPlatformWebApi.Authentication;

namespace EvaluationPlatformWebApi.Controllers
{
    [RoutePrefix("api/evaluation")]
    [CustomAutorize(AccountRoleType.UserRole, AccountRoleType.Admin)]
    public class EvaluationController : BaseWebApiController
    {

        public EvaluationController(IQueryProccesor queryProccesor, ICommandProcessor commandProcessor)
            : base(commandProcessor, queryProccesor)
        {

        }

        [Route("plannedEvaluations")]
        [HttpGet]
        public IEnumerable<EvaluationBaseInfo> PlannedEvaluations()
        {
            return QueryProccesor.Execute(new PlannedEvaluationBaseInfoQueryDto(AccountId));
        }

        [Route("evaluationsForBundle")]
        [HttpPost]
        public IEnumerable<EvaluationInfo> EvaluationsForbundle(GuidDto bundleIdDto)
        {
            return QueryProccesor.Execute(new EvaluationInfosForBundleQueryDto(bundleIdDto.Id));
        }

        [Route("updateEvaluation")]
        [HttpPost]
        public EvaluationInfo UpdateEvaluation(EvaluationInfo evaluationInfo)
        {
            CommandProcessor.Execute(new UpdateEvaluationItemsCommandDto(evaluationInfo));


            return QueryProccesor.Execute(new EvaluationsQueryDto(new List<Guid>() {evaluationInfo.Id})).FirstOrDefault();
        }

        [Route("updateEvaluations")]
        [HttpPost]
        public IEnumerable<EvaluationInfo> UpdateEvaluations(IEnumerable<EvaluationInfo> evaluationInfos)
        {
            if (evaluationInfos.Any())
            {
                foreach (var evaluationinfo in evaluationInfos)
                {
                    CommandProcessor.Execute(new UpdateEvaluationItemsCommandDto(evaluationinfo));
                }
            }

            var infoIds = evaluationInfos.Select(evaluationInfo => evaluationInfo.Id).ToList();

            return QueryProccesor.Execute(new EvaluationsQueryDto(infoIds));
        }

        [Route("searchEvaluations")]
        [HttpPost]
        public EvaluationsPagedQueryResult SearchEvaluations(EvaluationsPagedQueryDto evaluationsQueryObject)
        {
            return QueryProccesor.Execute(evaluationsQueryObject);
        }

        [Route("createPdfForEvaluations")]
        [HttpPost]
        public HttpResponseMessage CreatePdfForEvaluations(PdfForEvaluationsQueryDto pdfForEvaluationsQueryObject)
        {
            FileRepresentationModel fileRepresentationModel = QueryProccesor.Execute(pdfForEvaluationsQueryObject);

            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new ByteArrayContent(fileRepresentationModel.ContentAsByteArray);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = fileRepresentationModel.FullFilename();
            response.Content.Headers.ContentType = fileRepresentationModel.MediaTypeHeaderValue;

            return response;
        }
    }

}