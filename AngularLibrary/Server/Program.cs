using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.DataProtection;
using System.IO;
using System.Text;
using Microsoft.Extensions.Configuration;
using System;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore;

namespace AngularLibrary
{
	/// <summary>
	/// Main class for this project.
	/// </summary>
	public class Program
	{
		/// <summary>
		/// Main method for this project.
		/// </summary>
		/// <param name="args">The arguments passed to the app.</param>
		public static void Main(string[] args)
		{
			if (args.Length == 0)
			{
				// BuildWebHost(args).Build().Run();
				BuildWebHost(args).Run();
			}
		}

		/// <summary>
		/// Builds the web host.
		/// </summary>
		/// <param name="args">The arguments passed via the console.</param>
		/// <returns>An <see cref="IWebHost" /> reference.</returns>
		
		  public static IWebHost BuildWebHost(string[] args) =>
    WebHost.CreateDefaultBuilder(args)
        .UseStartup<Startup>()
        .Build();
	}
}
