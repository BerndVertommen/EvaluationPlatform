using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.EvaluationTemplate;
using EvaluationPlatformDAL;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.QueryDto;

namespace EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.QueryHandlers
{
    public class GetEvaluationsTemplatesQueryHandler : QueryHandler<GetEvaluationTemplatesQueryDto,IEnumerable<EvaluationTemplateInfo>>
    {
        public GetEvaluationsTemplatesQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<EvaluationTemplateInfo> Handle(GetEvaluationTemplatesQueryDto queryObject)
        {
            var teacher = Database.GetTeacherForAccount(queryObject.AccountId);



            return Mapper.Map<IEnumerable<EvaluationTemplate>,IEnumerable<EvaluationTemplateInfo>>(teacher.EvaluationTemplates.Where(e=> !e.Hide));
        }
    }
}