﻿using AutoMapper;
using EvaluationPlatformDataTransferModels.InformationModels;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation
{
    public class GetCreateEvaluationOptionsQueryHandler : QueryHandler<GetCreateEvaluationOptionsQueryObject, CreateEvaluationOptions>
    {
        public GetCreateEvaluationOptionsQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override CreateEvaluationOptions Handle(GetCreateEvaluationOptionsQueryObject queryObject)
        {
            CreateEvaluationOptions createEvaluationOptions = new CreateEvaluationOptions();

            createEvaluationOptions = SetTeacher(queryObject,createEvaluationOptions);
            
            return createEvaluationOptions;
        }

        private CreateEvaluationOptions SetTeacher(GetCreateEvaluationOptionsQueryObject queryObject, CreateEvaluationOptions createEvaluationOptions)
        {
            Teacher teacher = Database.GetTeacherForAccount(queryObject.AccountId);

            createEvaluationOptions.Teacher = Mapper.Map<TeacherInfo>(teacher);

            return createEvaluationOptions;
        }
    }
}