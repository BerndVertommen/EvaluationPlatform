﻿using System;

namespace EvaluationPlatformLogic.Exeptions
{
    public class BusinessExeption : ApplicationException
    {
        public static string EvaluationExitst = "De evaluatie bestaat reeds";
        public static string UsernameExists = "De gebruikersnaam kan niet worden gebruikt";



        public BusinessExeption(string message) : base(message)
        {
        }

    }
}