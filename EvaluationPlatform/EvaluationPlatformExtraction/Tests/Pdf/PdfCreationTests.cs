using System.IO;
using NReco.PdfGenerator;
using Xunit;

namespace EvaluationPlatformExtraction.Tests.Pdf
{
    public class PdfCreationTests
    {
        [Fact]
        public void A_Pdf_Is_Generated()
        {
            //Arange 
            string html = @"<div class='row'>
    <div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>titel</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>1</td>
                        <td></td>
                    </tr>
                 
                </tbody>
            </table>
        </div>
    </div>
    <div>
        <div>
            <div>

                <div>
                    Voornaam Achternaam
                </div>
                <div>
                    <a>save</a>
                </div>
            </div>
            <div>
                <div>
                    <h5>Omschrijving</h5>
                    <table>
                        <thead>
                            <tr>
                                <th>Omschrijving:</th>
                                <th>Gewicht</th>

                                <th>Score</th>
                                <th>?</th>
                                <th>---</th>

                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>doel omschrijving</td>
                                <td>20</td>
                                <td>
                                    <a>3</a>
                                </td>
                                <td>
                                    <div>
                                       Andere taak
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>doel omschrijving</td>
                                <td>20</td>
                                <td>
                                    <a>3</a>
                                </td>
                                <td>
                                    <div>
                                        Afwezig
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>doel omschrijving</td>
                                <td>20</td>
                                <td>
                                    <a>3</a>
                                </td>
                                <td>
                                    <div>
                                        Andere taak
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>

                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div>Totaal: ??</div>

                <div>
                    <div> Opmerking:</div>
                    <div>
                        <textarea></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>";
            string filename = @"C:\temp\pdftest.pdf";
            var pdfConverter = new HtmlToPdfConverter();
            pdfConverter.Orientation = PageOrientation.Landscape;

            //Act
            pdfConverter.GeneratePdf(html,null, filename);
           
            // bool success = SaveData(filename, pdfbytes);

            ////Assert
            //Assert.True(success);
            //Assert
            // no assert assert = no error
        }


        // move this an appropriate class
        protected bool SaveData(string fileName, byte[] data)
        {
            BinaryWriter Writer = null;

            try
            {
                // Create a new stream to write to the file
                Writer = new BinaryWriter(File.OpenWrite(fileName));

                // Writer raw data                
                Writer.Write(data);
                Writer.Flush();
                Writer.Close();
            }
            catch
            {
                //...
                return false;
            }

            return true;
        }
    }
}
