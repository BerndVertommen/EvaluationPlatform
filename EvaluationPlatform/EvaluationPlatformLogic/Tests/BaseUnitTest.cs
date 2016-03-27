using System;
using System.IO;
using System.Reflection;

namespace EvaluationPlatformLogic.Tests
{
    public abstract class BaseUnitTest
    {
        public static string TestDataFilePath
        {
            get
            {
                string codeBase = Assembly.GetExecutingAssembly().CodeBase;
                UriBuilder uri = new UriBuilder(codeBase);
                string path = Uri.UnescapeDataString(uri.Path);
                path = path.Replace("/bin/Debug", string.Empty);
                return Path.GetDirectoryName(path) + "\\TestDataFiles\\";
            }
        }

        public static string OutputFilePath
        {
            get
            {
                return @"C:\temp\";
            }
        }
    }
}
