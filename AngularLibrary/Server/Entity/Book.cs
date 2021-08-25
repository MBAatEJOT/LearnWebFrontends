#pragma warning disable 1591
using System.Collections.Generic;

namespace AngularLibrary.Entity
{
	public class Book
	{

		public int? Id { get; set; }
		public string Title { get; set; }
		public string Location { get; set; }
		public List<int> AuthorIds { get; set; }
		public List<int> PublisherIds {get;set;}
	}


}

