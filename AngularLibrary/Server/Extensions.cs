#pragma warning disable 1591

using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace AngularLibrary.Extensions
{
	public static class Extensions
	{
		public static IApplicationBuilder UseAngularRoutes(this IApplicationBuilder app)
		{
			if (app == null)
				throw new ArgumentNullException(nameof(app));

			return app.Use(async (context, next) =>
			{
				try
				{
					await next();

					if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
					{
						context.Request.Path = "/";
						context.Response.StatusCode = StatusCodes.Status200OK;
						await next();
					}
				}
				catch(Exception ex)
				{
					throw ex;
				}
			});
		}
	}
}