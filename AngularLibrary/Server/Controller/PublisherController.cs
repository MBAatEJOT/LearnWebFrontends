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
	/// Publisher controller
	/// </summary>
	[Route("api/[controller]")]
	public class PublisherController : Controller
	{
		#region Variables
		private ILogger<PublisherController> _logger;
		private DataContext _db;
		#endregion

		#region Constructor
		public PublisherController(ILogger<PublisherController> logger, DataContext db)
		{
			_logger = logger;
			_db = db;
		}
		#endregion

		#region Methods
		/// <summary>
		/// Returns a list of all Publishers
		/// </summary>
		/// <returns>All Publisher</returns>
		[HttpGet("[action]")]
		public ActionResult<Publisher> GetList()
		{
			try
			{
				return Ok(_db.Publishers.Include(b => b.Books));
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.GetHashCode(), ex, ex.Message);
				return StatusCode(500, ex);
			}
		}
		/// <summary>
		/// To retrieve Publishers by id
		/// </summary>
		/// <param name="id"></param>
		/// <returns>Publisher with id</returns>
		[HttpGet("[action]/{id}")]
		public ActionResult<Publisher> GetListbyID(int id)
		{
			try
			{
				return Ok(_db.Publishers.Where(a => a.Id == id).Include(a => a.Books).FirstOrDefault());
			}

			catch (Exception ex)
			{
				_logger.LogError(ex.GetHashCode(), ex, ex.Message);
				return StatusCode(500, ex);
			}
		}
		/// <summary>
		/// To Update the Publisher row in Database
		/// </summary>
		/// <param name="id"></param>
		/// <param name="publisher"></param>
		/// <returns></returns>
		[HttpPut("[action]/{id}")]
		public async Task<ActionResult<Publisher>> UpdatePublisher(int id, [FromBody] Publisher publisher)
		{
			try
			{
				if (!ModelState.IsValid)
					return BadRequest();

				Publisher existing = _db.Publishers.Where(a => a.Id == id).FirstOrDefault();
				existing.Name = publisher.Name;
				existing.Books = publisher.Books;
				await _db.SaveChangesAsync();

				return Ok(publisher);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.GetHashCode(), ex, ex.Message);
				return StatusCode(500, ex);
			}
		}
		/// <summary>
		/// To create an Publisher row in Database
		/// </summary>
		/// <param name="publisher"></param>
		/// <returns></returns>
		[HttpPost("[action]")]
		public async Task<ActionResult<Publisher>> CreatePublisher([FromBody] Publisher publisher)
		{
			try
			{
				if (!ModelState.IsValid)
					return BadRequest();

				Publisher existing = new Publisher();
				existing.Id = publisher.Id;
				existing.Name = publisher.Name;
				existing.Books = publisher.Books;

				_db.Publishers.Add(existing);
				await _db.SaveChangesAsync();

				return Ok(publisher);
			}
			catch (Exception ex)
			{
				_logger.LogError(ex.GetHashCode(), ex, ex.Message);
				return StatusCode(500, ex);
			}
		}
		/// <summary>
		/// To delete a row in the Publisher record in the Database
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpDelete("[action]/{id}")]
		public async Task<ActionResult<Publisher>> DeletePublisher(int id)
		{
			try
			{
				Publisher existing = _db.Publishers.Where(a => a.Id == id).FirstOrDefault();

				if (existing == null)
					return NotFound();

				_db.Publishers.Remove(existing);

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
		public ActionResult<IEnumerable<Publisher>> GetByBookId(int id)
		{
			var results = from p in _db.Publishers
								join bp in _db.BookPublishers on p.Id equals bp.PublisherId
								where bp.BookId == id
								select p;

			return Ok(results);
		}

		[HttpGet("[action]/{id}")]
		public ActionResult<IEnumerable<Book>> GetByPublisherId(int id)
		{
			var results = from b in _db.Books
								join bp in _db.BookPublishers on b.Id equals bp.BookId
								where bp.PublisherId == id
								select b;

			return Ok(results);
		}

		#endregion
	}
}