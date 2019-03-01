using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MVC_Arquitetura.Startup))]
namespace MVC_Arquitetura
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
