using System.Linq;
using AutoMapper.Internal;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.Command;

namespace EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.CommandHandlers
{
    public class HideEvaluationTemplatesCommandHandler : CommandHandler<HideEvaluationTemplatesCommand>
    {
        public HideEvaluationTemplatesCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(HideEvaluationTemplatesCommand commandObject)
        {
            var evaluations =
                Database.EvaluationTemplates.Where(e => commandObject.EvaluationInfos.Any(ei => ei.Id == e.Id));

            evaluations.Each(e => e.Hide = true);
        }
    }
}
