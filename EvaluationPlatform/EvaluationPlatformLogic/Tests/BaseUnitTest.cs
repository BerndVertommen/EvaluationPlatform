using System;
using System.Data.Entity;
using System.IO;
using System.Reflection;
using EvaluationPlatformDAL;

namespace EvaluationPlatformLogic.Tests
{
    public abstract class BaseUnitTest
    {
        public BaseUnitTest()
        {
            Database = new EPDatabase();
        }
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
        
        public EPDatabase Database { get; set; }
    }
}
