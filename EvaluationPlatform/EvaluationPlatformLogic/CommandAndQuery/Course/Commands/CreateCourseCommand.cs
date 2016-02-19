using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EvaluationPlatformDataTransferModels.CreationModels;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;

namespace EvaluationPlatformLogic.CommandAndQuery.Course.Commands
{
    public class CreateCourseCommand : ICommandObject
    {
        public CreateCourseInfo CreateCourseInfo { get; set; }

        public CreateCourseCommand(CreateCourseInfo createCourseInfo)
        {
            CreateCourseInfo = createCourseInfo;
        }
    }
}
