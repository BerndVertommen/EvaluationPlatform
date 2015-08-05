using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using EvaluationPlatformDAL;
using EvaluationPlatformDAL.CommandAndQuery;

namespace EvaluationPlatformWebApi.App_Start
{
    public class IocConfig
    {
        public static IContainer RegisterDependencies(HttpConfiguration httpConfig)
        {
            var builder = new ContainerBuilder();

            // Register your Web API controllers.
            builder.RegisterApiControllers(typeof(Controllers.ClassesController).Assembly);

            // OPTIONAL: Register the Autofac filter provider.
            builder.RegisterWebApiFilterProvider(httpConfig);

            // Register injection types
            builder.RegisterType<QueryProcessor>().AsImplementedInterfaces().InstancePerLifetimeScope();
            builder.RegisterType<CommandProcessor>().AsImplementedInterfaces().InstancePerLifetimeScope();
            builder.RegisterType<EPDatabase>().As<IEPDatabase>().InstancePerLifetimeScope();

            builder.RegisterAssemblyTypes(typeof(QueryHandler<,>).Assembly)
                        .Where(t => t.GetInterface(typeof(IQueryHandler<,>).Name) != null)
                        .AsSelf().AsImplementedInterfaces().InstancePerLifetimeScope();

            builder.RegisterAssemblyTypes(typeof(CommandHandler<>).Assembly)
                .Where(t => t.GetInterface(typeof(ICommandHandler<>).Name) != null)
                .AsSelf().AsImplementedInterfaces().InstancePerLifetimeScope();

            IContainer container = builder.Build();
            //DependencyResolver.SetResolver(new AutofacWebApiDependencyResolver(container));
            //GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            httpConfig.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            return container;
        }
    }
}
