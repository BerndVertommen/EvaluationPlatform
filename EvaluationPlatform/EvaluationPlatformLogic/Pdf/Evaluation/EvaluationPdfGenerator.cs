using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using NReco.PdfGenerator;

namespace EvaluationPlatformLogic.Pdf.Evaluation
{
    public class EvaluationPdfGenerator
    {
        private HtmlToPdfConverter _pdfConverter => new HtmlToPdfConverter();

        public IEnumerable<EvaluationPlatformDomain.Models.Evaluation> Evaluations{ get; set; }

        public byte[] GeneratePdf(IEnumerable<EvaluationPlatformDomain.Models.Evaluation> evaluations)
        {
            SetPageSettings(_pdfConverter);         

            StringBuilder htmlStringBuilder = new StringBuilder();

            EvaluationHtmlGenerator.GeneratePdfHtml(htmlStringBuilder, evaluations);

            byte[] pdfAsByteArray = _pdfConverter.GeneratePdf(htmlStringBuilder.ToString(),null);

            return pdfAsByteArray;
        }

        private void SetPageSettings(HtmlToPdfConverter pdfConverter)
        {
            _pdfConverter.Orientation = PageOrientation.Landscape;
            _pdfConverter.Size = PageSize.A4;
            _pdfConverter.Margins.Bottom = 5;
            _pdfConverter.Margins.Top = 15;
            _pdfConverter.Margins.Left = 10;
            _pdfConverter.Margins.Right = 10;
        }

        public void GeneratePdfToFile(IEnumerable<EvaluationPlatformDomain.Models.Evaluation> evaluations, string output)
        {
            SetPageSettings(_pdfConverter);

            StringBuilder htmlStringBuilder = new StringBuilder();

            EvaluationHtmlGenerator.GeneratePdfHtml(htmlStringBuilder, evaluations);

           _pdfConverter.GeneratePdf(htmlStringBuilder.ToString(), null,output);
        }


    }
}
