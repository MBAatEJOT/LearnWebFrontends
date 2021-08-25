#pragma warning disable 1591
using System.Collections.Generic;

namespace AngularLibrary.Entity
{
	public class Publisher
	{
		public int? Id { get; set; }
		public string Name { get; set; }
		public List<Book> Books {get;set;}
	}

	
}