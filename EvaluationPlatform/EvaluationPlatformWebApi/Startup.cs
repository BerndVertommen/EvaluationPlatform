using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Autofac;
using EvaluationPlatformWebApi;
using EvaluationPlatformWebApi.App_Start;
using EvaluationPlatformWebApi.Authentication;
using Microsoft.Owin;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using Owin;

[assembly: OwinStartup(typeof(Startup))]

namespace EvaluationPlatformWebApi
{
    public partial class Startup
    {
        public IContainer Container { get; protected set; }

        public void Configuration(IAppBuilder app)
        {
            var httpConfig = new HttpConfiguration();
            Container = IocConfig.RegisterDependencies(httpConfig);
            app.UseAutofacMiddleware(Container);
            ConfigureAuth(app);
            ConfigureJsonSerialization(httpConfig);

            httpConfig.Filters.Add(new CustomAutorizeAttribute());
            WebApiConfig.Register(httpConfig);

            app.UseWebApi(httpConfig);

            httpConfig.EnsureInitialized();
        }

        public static void ConfigureJsonSerialization(HttpConfiguration httpConfiguration)
        {
            var jsonSerializerSettings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
            };
            jsonSerializerSettings.Converters.Add(new StringEnumConverter { CamelCaseText = true });
            jsonSerializerSettings.TypeNameHandling = TypeNameHandling.Auto;
            httpConfiguration.Formatters.JsonFormatter.SerializerSettings = jsonSerializerSettings;
            JsonConvert.DefaultSettings = () => jsonSerializerSettings;
        }

    }
}
