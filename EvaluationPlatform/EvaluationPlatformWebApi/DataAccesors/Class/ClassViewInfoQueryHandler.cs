﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformWebApi.Models;

namespace EvaluationPlatformWebApi.DataAccesors.Class
{
    public class ClassViewInfoQueryHandler : IQueryHandler<ClassViewInfoQueryObject,ClassViewInfo>
    {
        private readonly IEPDatabase _database;

        public ClassViewInfoQueryHandler(IEPDatabase database)
        {
            _database = database;
        }

        public ClassViewInfo Handle(ClassViewInfoQueryObject queryObject)
        {
            var retClass =
                _database.Classes.FirstOrDefault(
                    c => c.Name == queryObject.ClassName && c.SchoolYear == queryObject.SchoolYear);

            return Mapper.Map<ClassViewInfo>(retClass);
        }
    }
}
