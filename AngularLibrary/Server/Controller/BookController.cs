using System;
using System.Linq;
using System.Threading.Tasks;
using AngularLibrary.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AngularLibrary.Controllers
{
	/// <summary>
	/// Book Controller to fetch api for Books module
	/// </summary>
	[Route("api/[controller]")]
	public class BookController : Controller
	{
		#region Variables
		private ILogger<BookController> _logger;
		private DataContext _db;
		#endregion

		#region Constructor
		public BookController(ILogger<BookController> logger, DataContext db)
		{
			_logger = logger;
			_db = db;
		}
		#endregion

		#region Methods
		/// <summary>
		/// Returns a list of all books
		/// </summary>
		/// <returns>All books</returns>
		[HttpGet("[action]")]
		public ActionResult<Book> GetList()
		{
			try
			{
				return Ok(_db.Books);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.GetHashCode(), ex, ex.Message);
				return StatusCode(500, ex);
			}
		}
		/// <summary>
		/// To retrieve Books by id
		/// </summary>
		/// <param name="id"></param>
		/// <returns>Book with id</returns>
		[HttpGet("[action]/{id}")]
		public ActionResult<Book> GetListbyID(int id)
		{
			try
			{
				return Ok(_db.Books.Where(b => b.Id == id).FirstOrDefault());
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.GetHashCode(), ex, ex.Message);
				return StatusCode(500, ex);
			}
		}
		/// <summary>
		/// To update the books
		/// </summary>
		/// <param name="id"></param>
		/// <param name="book"></param>
		/// <returns>updated book</returns>
		[HttpPut("[action]/{id}")]
		public async Task<ActionResult<Book>> UpdateBook(int id, [FromBody] Book book)
		{
			try
			{
				if (!ModelState.IsValid)
					return BadRequest();

				Book existing = _db.Books.Where(b => b.Id == id).FirstOrDefault();
				existing.Location = book.Location;
				existing.Title = book.Title;
				existing.AuthorIds = book.AuthorIds;
				existing.PublisherIds = book.PublisherIds;
				await _db.SaveChangesAsync();

				var authorArray=  _db.BookAuthors.Where(b => b.BookId == id).ToList();
				authorArray.ForEach(a=> 
				{
					_db.BookAuthors.Remove(a);

				});
				await _db.SaveChangesAsync();

				var publisherArray=  _db.BookPublishers.Where(b => b.BookId == id).ToList();
				publisherArray.ForEach(a=> 
				{
					_db.BookPublishers.Remove(a);

				});
				await _db.SaveChangesAsync();

				book.PublisherIds.ForEach(p =>
				{
					_db.BookPublishers.Add(new BookPublisher { PublisherId = p, BookId = existing.Id });
				});
				await _db.SaveChangesAsync();

					book.AuthorIds.ForEach(a =>
				{
					_db.BookAuthors.Add(new BookAuthor { AuthorId = a, BookId = existing.Id });
				});
				await _db.SaveChangesAsync();

				return Ok(book);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.GetHashCode(), ex, ex.Message);
				return StatusCode(500, ex);
			}
		}
		/// <summary>
		/// To create a new row of Books in the Database
		/// </summary>
		/// <param name="book"></param>
		/// <returns></returns>
		[HttpPost("[action]")]
		public async Task<ActionResult<Book>> CreateBook([FromBody] Book book)
		{
			try
			{
				if (!ModelState.IsValid)
					return BadRequest();
				Book existing = new Book();
				existing.Location = book.Location;
				existing.Title = book.Title;
				existing.AuthorIds = book.AuthorIds;
				existing.PublisherIds = book.PublisherIds;

				_db.Books.Add(existing);
				await _db.SaveChangesAsync();

				book.AuthorIds.ForEach(a =>
				{
					_db.BookAuthors.Add(new BookAuthor { AuthorId = a, BookId = existing.Id });
				});
				await _db.SaveChangesAsync();
					book.PublisherIds.ForEach(p =>
				{
					_db.BookPublishers.Add(new BookPublisher { PublisherId = p, BookId = existing.Id });
				});
				await _db.SaveChangesAsync();

				return Ok(book);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.GetHashCode(), ex, ex.Message);
				return StatusCode(500, ex);
			}
		}
		/// <summary>
		/// To Delete a row of Books in the Database 
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpDelete("[action]/{id}")]
		public async Task<ActionResult<Book>> DeleteBook(int id)
		{
			try
			{
				var authorArray=  _db.BookAuthors.Where(b => b.BookId == id).ToList();
				authorArray.ForEach(a=> 
				{
					_db.BookAuthors.Remove(a);

				});
				await _db.SaveChangesAsync();

				var publisherArray=  _db.BookPublishers.Where(b => b.BookId == id).ToList();
				publisherArray.ForEach(a=> 
				{
					_db.BookPublishers.Remove(a);

				});
				await _db.SaveChangesAsync();

				Book existing = _db.Books.Where(b => b.Id == id).FirstOrDefault();

				if (existing == null)
					return NotFound();

				_db.Books.Remove(existing);
				await _db.SaveChangesAsync();

				return Ok(existing);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.GetHashCode(), ex, ex.Message);
				return StatusCode(500, ex);
			}
		}
		#endregion
	}
}