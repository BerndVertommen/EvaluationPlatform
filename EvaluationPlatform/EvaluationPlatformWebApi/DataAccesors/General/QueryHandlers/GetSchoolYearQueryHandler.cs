using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformWebApi.DataAccesors.General.QueryObjects;

namespace EvaluationPlatformWebApi.DataAccesors.General.QueryHandlers
{
    public class GetSchoolYearQueryHandler : QueryHandler<GetSchoolYearsQueryObject, IEnumerable<SchoolYearInfo>>
    {
        public GetSchoolYearQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<SchoolYearInfo> Handle(GetSchoolYearsQueryObject queryObject)
        {
         var schoolyears = Database.SchoolYears.Where(s => s.StartYear == SchoolYear.GetStartYearThisSchoolYear()).ToList();

            return AutoMapper.Mapper.Map<IEnumerable<SchoolYearInfo>>(schoolyears);
        }
    }
}