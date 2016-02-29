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
        {}

        public override void Handle(HideEvaluationTemplatesCommand commandObject)
        {
            var templateIds = commandObject.EvaluationInfos.Select(e => e.Id);

            var evaluations =
                Database.EvaluationTemplates.Where(e => templateIds.Any(ei => ei == e.Id));

            evaluations.Each(e => e.Hide = true);
        }
    }
}
