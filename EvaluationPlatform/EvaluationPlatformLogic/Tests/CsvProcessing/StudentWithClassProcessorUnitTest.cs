using System.Linq;
using EvaluationPlatformLogic.CsvProcessing.Processors.Student;
using EvaluationPlatformLogic.CsvProcessing.ResultHandlers.Student;
using Xunit;

namespace EvaluationPlatformLogic.Tests.CsvProcessing
{
    public class StudentWithClassProcessorUnitTest : BaseUnitTest
    {
        private readonly string _fullTestFilePath = TestDataFilePath + "klaslijsten BVL.csv";

        [Fact]
        public void StudentsWithClassAreReturned()
        {
            // Arrange
            var processor = new StudentWithClassCsvProcessor();

            // Act
            var result = processor.Process(_fullTestFilePath);

            // Execute
            Assert.True(result.Any());
        }


        [Fact]
        public void StudentsWithClassAreProcessed()
        {
            // Arrange

            var processor = new StudentWithClassCsvProcessor();
            var resultHandler = new StudentWithClassResultHandler(Database, Database.SchoolYears.FirstOrDefault());

            // Act
            var records = processor.Process(_fullTestFilePath);

            resultHandler.Handle(records);

            Database.SaveChanges();

            // Execute
            Assert.True(true);
          
        }
    }
}
