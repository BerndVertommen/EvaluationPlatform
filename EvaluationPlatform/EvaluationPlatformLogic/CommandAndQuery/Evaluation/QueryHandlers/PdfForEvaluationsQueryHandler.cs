using System.Linq;
using System.Net.Http.Headers;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryDto;
using EvaluationPlatformLogic.Models.File;
using EvaluationPlatformLogic.Pdf.Evaluation;

namespace EvaluationPlatformLogic.CommandAndQuery.Evaluation.QueryHandlers
{
    public class PdfForEvaluationsQueryHandler : QueryHandler<PdfForEvaluationsQueryDto, FileRepresentationModel>
    {
        public PdfForEvaluationsQueryHandler(IEPDatabase database) : base(database)
        {
        }

        public override FileRepresentationModel Handle(PdfForEvaluationsQueryDto queryObject)
        {
            IQueryable<EvaluationPlatformDomain.Models.Evaluation> evaluations =
                Database.Evaluations.Where(e => queryObject.EvaluationIds.Contains(e.Id));

            EvaluationPdfGenerator pdfGenerator = new EvaluationPdfGenerator();

            byte[] pdfContent = pdfGenerator.GeneratePdf(evaluations.ToList());
            string filename = string.IsNullOrWhiteSpace(queryObject.Filename) ? "evaluaties": queryObject.Filename;

            FileRepresentationModel fileRepresentationModel = new FileRepresentationModel(filename, ".pdf", pdfContent, new MediaTypeHeaderValue("application/pdf"));

            return fileRepresentationModel;
        }
    }
}
