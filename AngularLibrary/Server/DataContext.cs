#pragma warning disable 1591
using AngularLibrary.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AngularLibrary
{
	public partial class DataContext : DbContext
	{
		public DataContext(DbContextOptions<DataContext> options)
			: base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Author>(entity =>
			{
				entity.ToTable("Author");

				entity.HasKey(e => e.Id);
				entity.Property(e => e.FirstName).IsRequired();
				entity.Property(e => e.LastName).IsRequired();
				entity.HasMany<BookAuthor>()
						.WithOne()
						.HasForeignKey(e => e.AuthorId);
				entity.HasData(
					new Author {Id = 1, FirstName = "Maximilian", LastName = "Vollendorf"},
					new Author {Id = 2, FirstName = "Frank", LastName = "Bongers"},
					new Author {Id = 3, FirstName = "Michael", LastName = "Wegelin"},
					new Author {Id = 4, FirstName = "Michael", LastName = "Englbrecht"},
					new Author {Id = 5, FirstName = "Adam", LastName = "Freeman"},
					new Author {Id = 6, FirstName = "Ugurlu", LastName = "Tugberk"},
					new Author {Id = 7, FirstName = "Alexander", LastName = "Zeitler"},
					new Author {Id = 8, FirstName = "Ali", LastName = "Kheyrollahi"}
				);
			});

			modelBuilder.Entity<Book>(entity =>
			{
				entity.ToTable("Book");

				entity.HasKey(e => e.Id);
				entity.Property(e => e.Title).IsRequired();
				entity.Property(e => e.Location).IsRequired();
				entity.HasMany<BookPublisher>()
						.WithOne()
						.HasForeignKey(e => e.BookId);

				entity.HasMany<BookAuthor>()
						.WithOne()
						.HasForeignKey(e => e.BookId);
				entity.Ignore(e => e.AuthorIds);
				entity.Ignore(e => e.PublisherIds);
				entity.HasData(
					new Book{Id=1,Title="jQuery - Das umfassende Handbuch",Location="Büro 34"},
					new Book{Id=2,Title="SAP® - Schnittstellenprogrammierung",Location="Büro 34"},
					new Book{Id=3,Title="Pro ASP.NET MVC 4",Location="Büro 34"},
					new Book{Id=4,Title="Pro ASP.NET Web API",Location="Büro 34"}
				);
			});

			modelBuilder.Entity<Publisher>(entity =>
			{
				entity.ToTable("Publisher");

				entity.HasKey(e => e.Id);
				entity.Property(e => e.Name).IsRequired();

				entity.HasMany<BookPublisher>()
						.WithOne()
						.HasForeignKey(e => e.PublisherId);
				entity.HasData(
					new Publisher{Id = 1, Name = "Galileo Computing"},
					new Publisher{Id = 2, Name = "SAP PRESS"},
					new Publisher{Id = 3, Name = "Apress"}
				);
			});

			modelBuilder.Entity<BookPublisher>(entity => 
			{
				entity.ToTable("BookPublisher");
				entity.HasKey(e => e.Id);
				entity.HasData(
					new BookPublisher{Id=1, BookId = 1,PublisherId = 1},
					new BookPublisher{Id=2, BookId = 2,PublisherId = 2},
					new BookPublisher{Id=3, BookId = 3,PublisherId = 3},
					new BookPublisher{Id=4, BookId = 4,PublisherId = 3}
				);
			});

			modelBuilder.Entity<BookAuthor>(entity => 
			{
				entity.ToTable("BookAuthor");
				entity.HasKey(e => e.Id);
				entity.HasData(
					new BookAuthor{Id = 1 , BookId = 1, AuthorId = 1 },
					new BookAuthor{Id = 2 , BookId = 1, AuthorId = 2},
					new BookAuthor{Id = 3 , BookId = 2, AuthorId = 3},
					new BookAuthor{Id = 4 , BookId = 2, AuthorId =4 },
					new BookAuthor{Id = 5 , BookId = 3, AuthorId =5 },
					new BookAuthor{Id = 6 , BookId = 4, AuthorId =6},
					new BookAuthor{Id = 7 , BookId = 4, AuthorId =7 },
					new BookAuthor{Id = 8 , BookId = 4, AuthorId =8 }

				);
			});
		}

		public virtual DbSet<Author> Authors { get; set; }
		public virtual DbSet<Book> Books { get; set; }
		public virtual DbSet<Publisher> Publishers { get; set; }
		public virtual DbSet<BookPublisher> BookPublishers { get; set; }
		public virtual DbSet<BookAuthor> BookAuthors { get; set; }
	}
}