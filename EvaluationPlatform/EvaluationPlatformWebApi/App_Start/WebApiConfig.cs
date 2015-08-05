using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using EvaluationPlatformWebApi.App_Start;

namespace EvaluationPlatformWebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
                // Configure Mappings
            MappingConfigurations.Configure();


            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
