using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDAL;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.General.QueryObjects;

namespace EvaluationPlatformLogic.CommandAndQuery.General.QueryHandlers
{
    public class GetSchoolYearQueryHandler : QueryHandler<GetSchoolYearsQueryObject, IEnumerable<SchoolYearInfo>>
    {
        public GetSchoolYearQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<SchoolYearInfo> Handle(GetSchoolYearsQueryObject queryObject)
        {
         var schoolyears = Database.SchoolYears.Where(s => s.StartYear == SchoolYear.GetStartYearThisSchoolYear()).ToList();

            return Mapper.Map<IEnumerable<SchoolYearInfo>>(schoolyears);
        }
    }
}