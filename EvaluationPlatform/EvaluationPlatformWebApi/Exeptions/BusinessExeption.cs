﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EvaluationPlatformWebApi.Exeptions
{
    public class BusinessExeption : ApplicationException
    {
        public static string EvaluationExitst = "De evaluatie bestaat reeds";


        public BusinessExeption(string message) : base(message)
        {
        }

    }
}