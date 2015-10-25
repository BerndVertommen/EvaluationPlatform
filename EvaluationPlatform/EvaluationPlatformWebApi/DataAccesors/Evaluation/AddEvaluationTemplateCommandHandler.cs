using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EvaluationPlatformDataTransferModels.InformationModels.Evaluation;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformDomain.Models;

namespace EvaluationPlatformWebApi.DataAccesors.Evaluation
{
    public class AddEvaluationTemplateCommandHandler: CommandHandler<AddEvaluationTemplateCommand>
    {
        public AddEvaluationTemplateCommandHandler(IEPDatabase database) : base(database)
        {
        }

        public override void Handle(AddEvaluationTemplateCommand command)
        {
            var templateInfo = command.EvaluationTemplateInfo;
            var course = _database.Courses.FirstOrDefault(c => c.Id == templateInfo.Course.Id);
            var subsSections = new List<EvaluationSubSection>();

            foreach (EvaluationSubSectionInfo subSection in templateInfo.EvaluationSubSections)
            {
                var goals = GetGoalsForSubSection(subSection).ToList();
                subsSections.Add(new EvaluationSubSection( subSection.Discription,
                                                            subSection.Weight,
                                                            goals));

            }

            var newEvaluationTemplate = new EvaluationTemplate(course,templateInfo.Discription,subsSections);
            _database.EvaluationTemplates.Add(newEvaluationTemplate);

            SaveChanges();
        }

        private IEnumerable<Goal> GetGoalsForSubSection(EvaluationSubSectionInfo subsection)
        {
            var goals = new List<Goal>();
            foreach (var subGoal in subsection.Goals)
            {
                goals.Add(_database.Goals.FirstOrDefault(g => g.Id == subGoal.Id)); 
            }
            
            return goals;
        } 
    }
}