using System.Collections.Generic;
using System.Linq;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformLogic.CsvProcessing.Processors;
using Xunit;

namespace EvaluationPlatformLogic.Tests.CsvProcessing
{
    public class StudentCsvProcessingTests : BaseUnitTest
    {
        private readonly string _fullTestFilePath = TestDataFilePath + "testclass.csv";

        [Fact]
        public void StudentsAreReturned()
        {
            // Arrange
            var processor = new StudentCsvProcessor();

            // Act
            IEnumerable<Student> result = processor.Process(_fullTestFilePath);

            // Execute
            Assert.True(result.Any());
        }
    }
}
