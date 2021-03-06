﻿using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Class.QueryDto;

namespace EvaluationPlatformLogic.CommandAndQuery.Class.QueryHandlers
{
    public class ClassesAvailableForTeacherQueryHandler : QueryHandler<ClassesAvailableForTeacherQueryDto, IEnumerable<ClassBaseInfo>>
    {
        public ClassesAvailableForTeacherQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override IEnumerable<ClassBaseInfo> Handle(ClassesAvailableForTeacherQueryDto queryDto)
        {
            var teacher = Database.Teachers.FirstOrDefault(t => t.Id == queryDto.TeacherId);

            if (teacher == null)
            {
                throw new NullReferenceException("Teacher not found");
            }

            var classes = teacher.Courses.SelectMany(c => c.Classes).GroupBy(c => c.Id).Select(x => x.First()).ToList(); ;

            return Mapper.Map<IEnumerable<ClassBaseInfo>>(classes);

        }
    }
}