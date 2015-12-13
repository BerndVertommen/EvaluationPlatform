using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformWebApi.DataAccesors.Class.QueryObjects;

namespace EvaluationPlatformWebApi.DataAccesors.Class.QueryHandlers
{
    public class ClassesAvailableForTeacherQueryHandler : QueryHandler<ClassesAvailableForTeacherQueryObject, IEnumerable<ClassBaseInfo>>
    {
        public ClassesAvailableForTeacherQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<ClassBaseInfo> Handle(ClassesAvailableForTeacherQueryObject queryObject)
        {
            var teacher = Database.Teachers.FirstOrDefault(t => t.Id == queryObject.TeacherId);

            if (teacher == null)
            {
                throw new NullReferenceException("Teacher not found");
            }

            var classes = teacher.Courses.SelectMany(c => c.Classes).GroupBy(c => c.Id).Select(x => x.First()).ToList(); ;

            return Mapper.Map<IEnumerable<ClassBaseInfo>>(classes);

        }
    }
}