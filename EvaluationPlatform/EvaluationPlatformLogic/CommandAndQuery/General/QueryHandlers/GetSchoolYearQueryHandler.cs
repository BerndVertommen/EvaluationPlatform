using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDAL;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.General.QueryDto;

namespace EvaluationPlatformLogic.CommandAndQuery.General.QueryHandlers
{
    public class GetSchoolYearQueryHandler : QueryHandler<GetSchoolYearsQueryDto, IEnumerable<SchoolYearInfo>>
    {
        public GetSchoolYearQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<SchoolYearInfo> Handle(GetSchoolYearsQueryDto queryObject)
        {
         var schoolyears = Database.SchoolYears.ToList();

            return Mapper.Map<IEnumerable<SchoolYearInfo>>(schoolyears);
        }
    }
}