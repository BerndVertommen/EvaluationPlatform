using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Account.Commands
{
    public class CreateAccountCommand : ICommandObject
    {
        public CreateAccountInfo CreateAccountInfo { get; set; }

        public CreateAccountCommand(CreateAccountInfo createAccountInfo)
        {
            CreateAccountInfo = createAccountInfo;
        }
    }
}