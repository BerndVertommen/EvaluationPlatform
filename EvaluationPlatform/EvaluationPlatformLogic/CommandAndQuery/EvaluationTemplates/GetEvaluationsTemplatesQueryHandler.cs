using System.Collections.Generic;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.EvaluationTemplate;
using EvaluationPlatformDAL;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates
{
    public class GetEvaluationsTemplatesQueryHandler : QueryHandler<GetEvaluationTemplatesQueryObject,IEnumerable<EvaluationTemplateInfo>>
    {
        public GetEvaluationsTemplatesQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<EvaluationTemplateInfo> Handle(GetEvaluationTemplatesQueryObject queryObject)
        {
            var teacher = Database.GetTeacherForAccount(queryObject.AccountId);



            return Mapper.Map<IEnumerable<EvaluationTemplate>,IEnumerable<EvaluationTemplateInfo>>(teacher.EvaluationTemplates);
        }
    }
}