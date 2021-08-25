using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Extensions.Hosting;
using System.Linq;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.Identity.Web;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using AngularLibrary.Extensions;

namespace AngularLibrary
{
	/// <summary>
	/// The start up class for this project.
	/// </summary>
	public class Startup
	{
		private IConfiguration _Configuration;
		private readonly string _allowSpecificOrigins = "_allowSpecificOrigins";

		/// <summary>
		/// Creates a new instance of this class.
		/// </summary>
		/// <param name="config">The configuration.</param>
		public Startup(IConfiguration config)
		{
			_Configuration = config;
		}

		/// <summary>
		/// This method gets called by the runtime. Use this method to add services to the container.
		/// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
		/// </summary>
		/// <param name="services">The service collection.</param>
		public void ConfigureServices(IServiceCollection services)
		{

			services.AddCors(options =>
			{
				options.AddPolicy(_allowSpecificOrigins,
					builder =>
					{
						builder.AllowAnyOrigin();
					}
				);
			});
				
			services.AddOptions();
			services.AddMemoryCache();
			services.AddDbContext<DataContext>(options =>
			{
				options.UseSqlServer("Server=127.0.0.1, 1433;Initial Catalog=AngularLibrary;User ID=sa;Password=APr3ttyStr0ngP@ssword;MultipleActiveResultSets=True;");
			});

			services.AddControllers()
					  .AddNewtonsoftJson(x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

			var useHttps = _Configuration.GetValue<bool>("useHttps", false);
			if (useHttps)
			{
				services.Configure<MvcOptions>(options =>
				{
					options.Filters.Add(new RequireHttpsAttribute());
				});
			}
			services.AddMvc();
		}

		/// <summary>
		/// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		/// </summary>
		/// <param name="app">The current app builder.</param>
		/// <param name="env">The hosting environment.</param>
		/// <param name="loggerFactory">The logger factory.</param>
		/// <param name="provider">The current service provider.</param>
		/// <param name="logger">The logger of this class.</param>
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory, IServiceProvider provider, ILogger<Startup> logger)
		{
			var useHttpsScheme = _Configuration.GetValue<bool>("useHttpsScheme", false);
			if (useHttpsScheme)
			{
				app.Use((context, next) =>
				{
					context.Request.Scheme = "https";
					return next();
				});
			}

			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseAuthentication();

			var db = provider.GetService<DataContext>();
			if (db != null)
				db.Database.Migrate();

			var useHttps = _Configuration.GetValue<bool>("useHttps", false);
			if (useHttps)
			{
				var options = new RewriteOptions().AddRedirectToHttps();
				app.UseRewriter(options);
			}

			app.UseCors(_allowSpecificOrigins)
				.UseRouting()
				.UseDefaultFiles()
				.UseStaticFiles()
				.UseAngularRoutes();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});

#if DEBUG
			if (env.IsDevelopment())
			{
				app.UseSpa(spa => 
				{
					spa.Options.SourcePath = "../";
					spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
				});
			}
#endif
		}
	}
}
