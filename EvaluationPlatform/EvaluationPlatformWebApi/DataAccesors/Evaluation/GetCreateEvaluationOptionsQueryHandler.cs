using AutoMapper;
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
            Teacher teacher = Database.GetTeacherForAccount(queryObject.AccountId);

            createEvaluationOptions.Teacher = Mapper.Map<TeacherInfo>(teacher);
            
            return createEvaluationOptions;
        }
    }
}