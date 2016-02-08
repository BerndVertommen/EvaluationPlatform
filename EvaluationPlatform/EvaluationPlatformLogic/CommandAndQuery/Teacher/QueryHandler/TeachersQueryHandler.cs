using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Teacher;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Teacher.QueryObject;

namespace EvaluationPlatformLogic.CommandAndQuery.Teacher.QueryHandler
{
    public class TeachersQueryHandler : QueryHandler<TeachersQueryObject , IEnumerable<TeacherInfo>>
    {
        public TeachersQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<TeacherInfo> Handle(TeachersQueryObject queryObject)
        {
           // use queryobject to filter in the future, implement paging

            var teachers = Database.Teachers.ToList();

            return Mapper.Map<IEnumerable<TeacherInfo>>(teachers);
        }
    }
}