using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Class.QueryDto;

namespace EvaluationPlatformLogic.CommandAndQuery.Class.QueryHandlers
{
    public class AllClassesQueryHandler : QueryHandler<AllClassesDto, IEnumerable<ClassInfo>>
    {
        public AllClassesQueryHandler(IEPDatabase database) : base(database)
        {
            
        }

        public override IEnumerable<ClassInfo> Handle(AllClassesDto queryObject)
        {
            var classes = Database.Classes.Where(c => c.SchoolYear.StartYear == queryObject.StartYear).ToList();

            return Mapper.Map<IEnumerable<ClassInfo>>(classes);
        }
    }
}
