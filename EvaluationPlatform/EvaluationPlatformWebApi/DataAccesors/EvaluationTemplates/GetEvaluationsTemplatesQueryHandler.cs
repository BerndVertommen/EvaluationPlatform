using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDataTransferModels.InformationModels.EvaluationTemplate;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models;

namespace EvaluationPlatformWebApi.DataAccesors.EvaluationTemplates
{
    public class GetEvaluationsTemplatesQueryHandler : QueryHandler<GetEvaluationTemplatesQueryObject,IEnumerable<EvaluationTemplateInfo>>
    {
        public GetEvaluationsTemplatesQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<EvaluationTemplateInfo> Handle(GetEvaluationTemplatesQueryObject queryObject)
        {
            Teacher teacher = Database.GetTeacherForAccount(queryObject.AccountId);



            return Mapper.Map<IEnumerable<EvaluationTemplate>,IEnumerable<EvaluationTemplateInfo>>(teacher.EvaluationTemplates);
        }
    }
}