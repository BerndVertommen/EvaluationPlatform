using System;
using System.Web.Http;
using Autofac;
using EvaluationPlatformDAL.CommandAndQuery;
using EvaluationPlatformWebApi;
using EvaluationPlatformWebApi.Authentication;
using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using Owin;
using Swashbuckle.Application;

[assembly: OwinStartup(typeof(Startup))]

namespace EvaluationPlatformWebApi
{
    public partial class Startup
    {
        public IContainer Container { get; protected set; }
        private readonly string _apuUrl = "http://testplatformApi/";

        public void Configuration(IAppBuilder app)
        {
            var httpConfig = new HttpConfiguration();
            Container = IocConfig.RegisterDependencies(httpConfig);
            app.UseAutofacMiddleware(Container);

            ConfigureAuth(app);
            ConfigureWebApi(httpConfig);
            ConfigureJsonSerialization(httpConfig);
            ConfigureOAuthTokenGeneration(app, _apuUrl);
            //ConfigureOAuthTokenConsumption(app, _apuUrl);

            WebApiConfig.Register(httpConfig);

            app.UseWebApi(httpConfig);

            httpConfig.EnsureInitialized();

            httpConfig
             .EnableSwagger(c => c.SingleApiVersion("v1", "EvaluationPlatform api Documentation"))
             .EnableSwaggerUi();
        }

        private void ConfigureWebApi(HttpConfiguration httpConfig)
        {
            httpConfig.MapHttpAttributeRoutes();
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

        private void ConfigureOAuthTokenGeneration(IAppBuilder app, string apiUrl)
        {
            // Configure the db context and user manager to use a single instance per request
            //app.CreatePerOwinContext(EPDatabase.Create);

            OAuthAuthorizationServerOptions OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                //For Dev enviroment only (on production should be AllowInsecureHttp = false)
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/oauth/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = new CustomOAuthProvider(Container.Resolve<IQueryProccesor>(), Container.Resolve<ILifetimeScope>())
            };

            // OAuth 2.0 Bearer Access Token Generation
            app.UseOAuthAuthorizationServer(OAuthServerOptions);
           app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
        }
    }
}
