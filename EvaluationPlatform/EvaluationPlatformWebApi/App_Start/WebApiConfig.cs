using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using EvaluationPlatformWebApi.App_Start;
using Microsoft.Owin.Security.OAuth;

namespace EvaluationPlatformWebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType)); //Original
                                                                                               
            MappingConfigurations.Configure();

            // Web API routes
            //config.MapHttpAttributeRoutes();

            config.EnableCors(new EnableCorsAttribute("*","*","get,post,options,put,delete,head"));

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
