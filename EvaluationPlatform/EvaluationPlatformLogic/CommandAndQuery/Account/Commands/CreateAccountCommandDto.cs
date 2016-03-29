using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Account.Commands
{
    public class CreateAccountCommandDto : ICommandDto
    {
        public CreateAccountInfo CreateAccountInfo { get; set; }

        public CreateAccountCommandDto(CreateAccountInfo createAccountInfo)
        {
            CreateAccountInfo = createAccountInfo;
        }
    }
}