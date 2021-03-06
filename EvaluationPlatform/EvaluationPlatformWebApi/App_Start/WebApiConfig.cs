﻿using System.Web.Http;
using System.Web.Http.Cors;
using EvaluationPlatformDataTransferModels.InformationModels.Class;
using EvaluationPlatformDomain.Models;
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
            //config.Filters.Add(new CustomAutorizeAttribute());
            //config.Filters.Add(new AuthorizeAttribute());

            string[] domainNamespaces = { "EvaluationPlatformDomain.Models"};
            MappingConfigurations.Configure(typeof(Class).Assembly, typeof(ClassInfo).Assembly, domainNamespaces);
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
