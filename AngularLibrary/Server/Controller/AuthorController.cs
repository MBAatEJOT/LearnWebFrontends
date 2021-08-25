using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularLibrary.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AngularLibrary.Controllers
{
/// <summary>
/// Author Controller
/// </summary>
	[Route("api/[controller]")]
	public class AuthorController : Controller
	{
		#region Variables
		private ILogger<AuthorController> _logger;
		private DataContext _db;
		#endregion

		#region Constructor
		public AuthorController(ILogger<AuthorController> logger, DataContext db)
		{
			_logger = logger;
			_db = db;
		}
		#endregion

		#region Methods
		/// <summary>
		/// Returns a list of all Authors
		/// </summary>
		/// <returns>All Authors</returns>
		[HttpGet("[action]")]
		public ActionResult<Author> GetList()
		{
			try
			{
				return Ok(_db.Authors);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.GetHashCode(), ex, ex.Message);
				return StatusCode(500, ex);
			}
		}
		/// <summary>
		/// To retrieve Authors by id
		/// </summary>
		/// <param name="id"></param>
		/// <returns>Author with id</returns>
		[HttpGet("[action]/{id}")]
		public ActionResult<Author> GetListbyID(int id)
		{
			try
			{
				return Ok(_db.Authors.FirstOrDefault(a => a.Id == id));
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.GetHashCode(), ex, ex.Message);
				return StatusCode(500, ex);
			}
		}
/// <summary>
/// To update a row in the Database for Author .
/// </summary>
/// <param name="id"></param>
/// <param name="author"></param>
/// <returns></returns>
	[HttpPut("[action]/{id}")]
		public async Task<ActionResult<Author>> UpdateAuthor(int id, [FromBody] Author author)
		{
			try
			{
				if (!ModelState.IsValid)
					return BadRequest();

				Author existing = _db.Authors.Where(a => a.Id == id).FirstOrDefault();
				existing.FirstName = author.FirstName;
				existing.LastName = author.LastName;
				await _db.SaveChangesAsync();

				return Ok(author);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.GetHashCode(), ex, ex.Message);
				return StatusCode(500, ex);
			}
		}
/// <summary>
/// To create a new Author row in Database
/// </summary>
/// <param name="author"></param>
/// <returns></returns>
		[HttpPost("[action]")]
		public async Task<ActionResult<Author>> CreateAuthor([FromBody] Author author)
		{
			try
			{
				if (!ModelState.IsValid)
					return BadRequest();

				Author existing = new Author();
				existing.Id = author.Id;
				existing.FirstName = author.FirstName;
				existing.LastName = author.LastName;

				_db.Authors.Add(existing);
				await _db.SaveChangesAsync();

				return Ok(author);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.GetHashCode(), ex, ex.Message);
				return StatusCode(500, ex);
			}
		}
/// <summary>
/// To Delete a new Author row in Database
/// </summary>
/// <param name="id"></param>
/// <returns></returns>
		[HttpDelete("[action]/{id}")]
		public async Task<ActionResult<Author>> DeleteAuthor(int id)
		{
			try
			{
				Author existing = _db.Authors.Where(a => a.Id == id).FirstOrDefault();

				if (existing == null)
					return NotFound();

				_db.Authors.Remove(existing);

				await _db.SaveChangesAsync();

				return Ok(existing);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.GetHashCode(), ex, ex.Message);
				return StatusCode(500, ex);
			}
		}

		[HttpGet("[action]/{id}")]
		public ActionResult<IEnumerable<Author>> GetByBookId(int id)
		{
			var results = from p in _db.Authors
								join ap in _db.BookAuthors on p.Id equals ap.AuthorId
								where ap.BookId == id
								select p;

			return Ok(results);
		}

		[HttpGet("[action]/{id}")]
		public ActionResult<IEnumerable<Book>> GetByAuthorId(int id)
		{
			var results = from b in _db.Books
								join bp in _db.BookAuthors on b.Id equals bp.BookId
								where bp.AuthorId == id
								select b;

			return Ok(results);
		}

		#endregion
	}
}