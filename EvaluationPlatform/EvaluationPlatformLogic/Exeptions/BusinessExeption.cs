using System;

namespace EvaluationPlatformLogic.Exeptions
{
    public class BusinessExeption : ApplicationException
    {
        public static string EvaluationExitst = "De evaluatie bestaat reeds";
        public static string UsernameExists = "De gebruikersnaam kan niet worden gebruikt";
        public static string CourseExists = "De cursus bestaat al voor dit schooljaar!";



        public BusinessExeption(string message) : base(message)
        {
        }

    }
}