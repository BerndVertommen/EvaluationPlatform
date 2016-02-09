using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Text;
using EvaluationPlatformDomain.Models;

namespace EvaluationPlatformLogic.Pdf.Evaluation
{
    public static class EvaluationHtmlGenerator
    {
        public static void GeneratePdfHtml(StringBuilder htmlStringBuilder, IEnumerable<EvaluationPlatformDomain.Models.Evaluation> evaluations )
        {
            GeneratePageStart(htmlStringBuilder);

            foreach (var evaluation in evaluations)
            {
                GenerateGeneralInfo(htmlStringBuilder, evaluation);
                GenerateTable(htmlStringBuilder, evaluation);
            }

            GeneratePageEnd(htmlStringBuilder);

        }

       
        private static void GeneratePageStart(StringBuilder htmlStringBuilder)
        {
            htmlStringBuilder.AppendLine(@"
                                <!DOCTYPE html>
                                <html>
                                <head>
                                <meta http-equiv='Content-Type' content='text/html; charset=utf-8'/>
                                          <style>
                                    .category {
                                      background-color: lavender;
                                      font-weight: bold;
                                      text-align: center;
                                    }
                                    
                                    .columnDescription {
                                      width: 400px;
                                    }
                                    
                                    .columnGewicht {
                                      width: 50px;
                                      text-overflow: ellipsis;
                                      overflow: hidden;
                                    }
                                    
                                    .columnScore {
                                      width: 50px;
                                      text-align: center;
                                    }
                                    
                                    .columnNote {
                                      width: 80px;
                                      text-align: center;
                                    }
                                    
                                    .noOverflow {
                                      text-overflow: ellipsis;
                                      overflow: hidden;
                                    }
                                    
                                    table {
                                      border: gray;
                                      border-width: medium;
                                      border-style: double;
                                    }
                                    
                                    tr {
                                      border-width: thin;
                                      border-bottom: gray;
                                      border-style: solid;
                                    }
                                  </style>
                                
                                </head>
                                
                                <body>
                                  
                                
                                ");
        }
        
        private static void GenerateGeneralInfo(StringBuilder htmlStringBuilder,EvaluationPlatformDomain.Models.Evaluation evaluation)
        {
            htmlStringBuilder.AppendLine($@"
                <div style='width: 100%; page-break-after:always'>
                <div>
                <h3 style=' text-align: center'>{evaluation.Student.Person.FirstName} {evaluation.Student.Person.LastName}</h3>
                <h4>Evaluatie: {evaluation.Description}</h4>
                <span style='float:right'>Datum: {evaluation.EvaluationDate.ToShortDateString()}</span>
                <span style='float:left'>Vak: {evaluation.Course.Description}</span>
                </div>
                                        ");
        }

        private static void GenerateTable(StringBuilder htmlStringBuilder, EvaluationPlatformDomain.Models.Evaluation evaluation)
        {
            htmlStringBuilder.AppendLine($@"
                                        <table style='width:100%'>
                                        <thead>
                                          <tr>
                                            <th class='columnDescription'>Omschrijving:</th>
                                            <th class='columnScore'>Score</th>
                                            <th class='columnNote'></th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                           ");

            
            GenerateSubsections(htmlStringBuilder, evaluation);

            htmlStringBuilder.AppendLine($@"
                                          </tbody>
                                              </table>
                                              <div style='float:right'>Score: {evaluation.Result.Total.ToString("F")}</div>
                                              <div>&nbsp;</div>
                                              <div><b>Opmerking:</b> {evaluation.GeneralComment}</div>
                                            </div>");

           
        }

        private static void GenerateSubsections(StringBuilder htmlStringBuilder, EvaluationPlatformDomain.Models.Evaluation evaluation)
        {
            foreach (var subsection in evaluation.EvaluationTemplate.EvaluationSubSections.OrderByDescending(e => e.Weight))
            {
                htmlStringBuilder.AppendLine($@"
                                            <tr>
                                              <td colspan='3' class='columnDescription category'>{subsection.Description}: {subsection.Weight}</td>
                                            </tr>
                                    ");

                GenerateEvaluationItemRows(htmlStringBuilder,
                    evaluation.EvaluationItems.Where(e => e.EvaluationSubSection.Id == subsection.Id));

                decimal subsectionResult;
                string resAsString = string.Empty;
                if (evaluation.Result.TotalsPercategory.TryGetValue(subsection.Id, out subsectionResult))
                {
                    resAsString = subsectionResult.ToString("F");
                }
 
                htmlStringBuilder.AppendLine($@"
                                                <tr>
                                                  <td class='columnDescription'></td>
                                                  <td class='columnScore' colspan='2'>Totaal: {resAsString}</td>
                                                </tr>
                                                ");
            }
           
        }

        private static void GenerateEvaluationItemRows(StringBuilder htmlStringBuilder, IEnumerable<EvaluationItem> evaluationItems)
        {
            foreach (var evaluationItem in evaluationItems)
            {
                string notScoredReason = evaluationItem.Score.HasValue ? string.Empty : evaluationItem.NotScoredReason.ToString();
                htmlStringBuilder.AppendLine(
                    $@"
                                            <tr>
                                                <td>
                                                    <div class='columnDescription noOverflow'> {evaluationItem.Goal.Description}</div>
                                                  </td>
                                                  <td>
                                                    <div class='columnScore'>{evaluationItem.Score}</div>
                                                  </td>
                                                  <td>
                                                    <div class='columnNote'>{notScoredReason}</div>
                                                  </td>
                                             </tr>
                                            ");
            }
        }

        private static void GeneratePageEnd(StringBuilder htmlStringBuilder)
        {
            // end html
            htmlStringBuilder.AppendLine($@"
                                          </body>
                                        </html>
                                           ");
        }
    }
}
