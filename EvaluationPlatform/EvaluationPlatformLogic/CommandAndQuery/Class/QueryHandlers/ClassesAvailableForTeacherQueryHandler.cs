using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Class.QueryObjects;

namespace EvaluationPlatformLogic.CommandAndQuery.Class.QueryHandlers
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