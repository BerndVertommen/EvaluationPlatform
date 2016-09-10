using System;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.CommandDto
{
    public class UnlockEvaluationCommandDto : ICommandDto
    {
        public Guid Id { get; set; }
        public Guid ExecutingAccountId { get; set; }

        public UnlockEvaluationCommandDto(Guid id, Guid accountId)
        {
            Id = id;
            ExecutingAccountId = accountId;
        }
    }
}