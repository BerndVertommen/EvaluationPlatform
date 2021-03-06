﻿using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using EvaluationPlatformDAL;
using EvaluationPlatformLogic.CommandAndQuery.Account.QueryHandlers;
using EvaluationPlatformLogic.CommandAndQuery.BaseClasses;
using EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates;
using EvaluationPlatformLogic.CommandAndQuery.EvaluationTemplates.CommandHandlers;
using EvaluationPlatformLogic.CommandAndQuery.StudyPlan.CommandDto;
using EvaluationPlatformLogic.CommandAndQuery.StudyPlan.CommandHandlers;
using EvaluationPlatformWebApi.Controllers;

namespace EvaluationPlatformWebApi
{
    public class IocConfig
    {
        public static IContainer RegisterDependencies(HttpConfiguration httpConfig)
        {
            var builder = new ContainerBuilder();

            // Register your Web API controllers.
            builder.RegisterApiControllers(typeof(BaseWebApiController).Assembly);

            // OPTIONAL: Register the Autofac filter provider.
            builder.RegisterWebApiFilterProvider(httpConfig);

            // Register injection types
            builder.RegisterType<QueryProcessor>().AsImplementedInterfaces().InstancePerLifetimeScope();
            builder.RegisterType<CommandProcessor>().AsImplementedInterfaces().InstancePerLifetimeScope();
            builder.RegisterType<EPDatabase>().As<IEPDatabase>().InstancePerLifetimeScope();

            // Add this so the assembly of the queyrHanderls is know to autofac
            builder.RegisterAssemblyTypes(typeof(GetAccountQueryHandler).Assembly)
                        .Where(t => t.GetInterface(typeof(IQueryHandler<,>).Name) != null)
                        .AsSelf().AsImplementedInterfaces().InstancePerLifetimeScope();
            
            builder.RegisterAssemblyTypes(typeof(CreateEvaluationTemplateCommandHandler).Assembly)
                .Where(t => t.GetInterface(typeof(ICommandHandler<>).Name) != null)
                .AsSelf().AsImplementedInterfaces().InstancePerLifetimeScope();

            builder.RegisterAssemblyTypes(typeof(CreateStudyPlanCommandHandler).Assembly)
                      .Where(t => t.GetInterface(typeof(ICommandHandler<,>).Name) != null)
                      .AsSelf().AsImplementedInterfaces().InstancePerLifetimeScope();

            IContainer container = builder.Build();
            //DependencyResolver.SetResolver(new AutofacWebApiDependencyResolver(container));
            //GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            httpConfig.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            return container;
        }
    }
}
