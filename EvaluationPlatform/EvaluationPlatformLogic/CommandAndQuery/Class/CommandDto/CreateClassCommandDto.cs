using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Class.CommandDto
{
    public class CreateClassCommandDto : ICommandDto
    {
        public CreateClassInfo CreateClassInfo { get; set; }

        public CreateClassCommandDto(CreateClassInfo createClassInfo)
        {
            CreateClassInfo = createClassInfo;
        }
    }
}
