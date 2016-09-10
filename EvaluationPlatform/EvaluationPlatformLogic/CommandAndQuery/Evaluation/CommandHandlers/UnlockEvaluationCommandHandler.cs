using System.Linq;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.CommandDto;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.CommandHandlers
{
    public class UnlockEvaluationCommandHandler : CommandHandler<UnlockEvaluationCommandDto>
    {
        public UnlockEvaluationCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(UnlockEvaluationCommandDto commandObject)
        {
            var account = Database.Accounts.FirstOrDefault(a => a.Id == commandObject.ExecutingAccountId);
            var evaluation = Database.Evaluations.FirstOrDefault(e => e.Id == commandObject.Id);

            evaluation?.EditAbleState.SetEditable(account);
        }
    }
}
