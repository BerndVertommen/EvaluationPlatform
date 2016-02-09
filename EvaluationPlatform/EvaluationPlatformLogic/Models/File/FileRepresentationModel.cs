using System.Net.Http.Headers;

namespace EvaluationPlatformLogic.Models.File
{
    public class FileRepresentationModel
    {
        public string Filename { get; set; }
        public string FileExtension { get; set; }
        public byte[] ContentAsByteArray { get; set; }
        public MediaTypeHeaderValue MediaTypeHeaderValue { get; set; }

        public FileRepresentationModel(string filename, string fileExtension, byte[] contentAsByteArray, MediaTypeHeaderValue mediaTypeHeaderValue)
        {
            Filename = filename;
            FileExtension = fileExtension;
            ContentAsByteArray = contentAsByteArray;
            MediaTypeHeaderValue = mediaTypeHeaderValue;
        }

        public string FullFilename()
        {
            return $"{Filename}{FileExtension}";
        }
    }
}
