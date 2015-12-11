using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformWebApi.DataAccesors.Class.QueryObjects;

namespace EvaluationPlatformWebApi.DataAccesors.Class.QueryHandlers
{
    public class ClassesForTeacherQueryHandler : QueryHandler<ClassesForTeacherQueryObject, IEnumerable<ClassInfo>>
    {
        public ClassesForTeacherQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<ClassInfo> Handle(ClassesForTeacherQueryObject queryObject)
        {
            var teacher = Database.Teachers.FirstOrDefault(t => t.Id == queryObject.TeacherId);

            if (teacher == null)
            {
                throw new NullReferenceException();
            }

            var classes = teacher.Classes.Where(c => c.SchoolYear.StartYear == SchoolYear.GetStartYearThisSchoolYear());

            return Mapper.Map<IEnumerable<ClassInfo>>(classes);
        }
    }
}