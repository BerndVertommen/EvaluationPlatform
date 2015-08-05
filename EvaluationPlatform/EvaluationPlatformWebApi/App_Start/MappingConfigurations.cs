using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using EvaluationPlatformDomain.Models;
using EvaluationPlatformWebApi.Models;

namespace EvaluationPlatformWebApi.App_Start
{
    public class MappingConfigurations 
    {
        public static void Configure()
        {
            // Class Mappings
            Mapper.CreateMap<Class, ClassViewInfo>();
        }
    }
}
