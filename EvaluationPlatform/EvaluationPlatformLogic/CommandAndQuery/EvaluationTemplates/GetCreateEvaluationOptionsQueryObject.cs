﻿using System;
using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates
{
    public class GetCreateEvaluationOptionsQueryObject : IQueryObject<CreateEvaluationOptions>
    {
        public Guid? AccountId { get; set; }

        public GetCreateEvaluationOptionsQueryObject(Guid? accountId)
        {
            AccountId = accountId;
        }
    }
}