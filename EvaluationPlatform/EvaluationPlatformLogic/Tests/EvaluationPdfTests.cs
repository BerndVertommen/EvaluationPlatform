using System.Collections.Generic;
using System.Linq;
using EvaluationPlatformDAL;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformLogic.Pdf.Evaluation;
using Xunit;

namespace EvaluationPlatformLogic.Tests
{
    public class EvaluationPdfTests : BaseUnitTest
    {
        [Fact]
        public void A_Pdf_Is_Generated_For_Multiple_Evaluations()
        {
            //Arrange

            //should not be using Db Replase with mocked objects later.
            EPDatabase db = new EPDatabase();
            IEnumerable<Evaluation> evaluations = db.Evaluations.Where(e => e.Finished).Take(5).ToList();

            EvaluationPdfGenerator pdfGenerator = new EvaluationPdfGenerator();
            string filename = OutputFilePath + "pdftest2.pdf";

            //act
            pdfGenerator.GeneratePdfToFile(evaluations,filename);
           
            
        }
    }
}
