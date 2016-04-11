using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformDomain;
using EvaluationPlatformLogic.CommandAndQuery.Class.QueryDto;

namespace EvaluationPlatformLogic.CommandAndQuery.Class.QueryHandlers
{
    public class ClassesForTeacherQueryHandler : QueryHandler<ClassesForTeacherQueryDto, IEnumerable<ClassInfo>>
    {
        public ClassesForTeacherQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<ClassInfo> Handle(ClassesForTeacherQueryDto queryObject)
        {
            var teacher = Database.Teachers.FirstOrDefault(t => t.Id == queryObject.TeacherId);

            if (teacher == null)
            {
                throw new NullReferenceException();
            }

            var classes = teacher.Classes.Where(c => c.SchoolYear.StartYear == EvaluationPlatformDomain.Models.SchoolYear.GetStartYearThisSchoolYear());

            return Mapper.Map<IEnumerable<ClassInfo>>(classes);
        }
    }
}