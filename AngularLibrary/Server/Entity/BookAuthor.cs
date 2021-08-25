using System.Collections.Generic;

namespace AngularLibrary.Entity
{
	public class BookAuthor
	{
		public int Id { get; set; }
		public int? BookId { get; set; }
		public int AuthorId { get; set; }
	}
}
