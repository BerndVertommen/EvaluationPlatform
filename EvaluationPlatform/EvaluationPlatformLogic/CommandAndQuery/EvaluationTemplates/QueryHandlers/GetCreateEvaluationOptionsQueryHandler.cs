using AutoMapper;
using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformDataTransferModels.InformationModels.Teacher;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.QueryDto;

namespace EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.QueryHandlers
{
    public class GetCreateEvaluationOptionsQueryHandler : QueryHandler<GetCreateEvaluationOptionsQueryDto, CreateEvaluationOptions>
    {
        public GetCreateEvaluationOptionsQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override CreateEvaluationOptions Handle(GetCreateEvaluationOptionsQueryDto queryObject)
        {
            CreateEvaluationOptions createEvaluationOptions = new CreateEvaluationOptions();

            createEvaluationOptions = SetTeacher(queryObject,createEvaluationOptions);
            
            return createEvaluationOptions;
        }

        private CreateEvaluationOptions SetTeacher(GetCreateEvaluationOptionsQueryDto queryObject, CreateEvaluationOptions createEvaluationOptions)
        {
            EvaluationPlatformDomain.Models.Teacher teacher = Database.GetTeacherForAccount(queryObject.AccountId);

            createEvaluationOptions.Teacher = Mapper.Map<TeacherInfo>(teacher);

            return createEvaluationOptions;
        }
    }
}