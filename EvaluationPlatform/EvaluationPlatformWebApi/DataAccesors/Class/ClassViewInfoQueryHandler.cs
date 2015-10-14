﻿using System.Linq;
using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;

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
            EvaluationPlatformDomain.Models.Class retClass =
                _database.Classes.FirstOrDefault(
                    c => c.Discription == queryObject.ClassName && c.SchoolYear.StartYear == queryObject.SchoolYear.StartYear && c.SchoolYear.EndYear == queryObject.SchoolYear.EndYear);

            return Mapper.Map<ClassViewInfo>(retClass);
        }
    }
}
