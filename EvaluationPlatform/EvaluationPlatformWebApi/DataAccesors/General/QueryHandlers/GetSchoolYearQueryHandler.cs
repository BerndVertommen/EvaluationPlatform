using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
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
            var now = DateTime.Now;
            // When before August return the previous year as startyear after August return the current year as startyear
            var thisYearStartYear = now.Month < 8 ? now.AddYears(-1).Year : now.Year;

            var schoolyears = Database.SchoolYears.Where(s => s.StartYear == thisYearStartYear).ToList();

            return AutoMapper.Mapper.Map<IEnumerable<SchoolYearInfo>>(schoolyears);
        }
    }
}