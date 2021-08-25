import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateAuthorComponent } from '../create-author/create-author.component';
import { AuthorService, IAuthor } from '../services/author.service';
import { BooksService, IBook } from '../services/books.service';
import { PublisherService,IPublisher } from '../services/publisher.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatePublisherComponent } from '../create-publisher/create-publisher.component';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {
	

  constructor(private _route: ActivatedRoute,private dialog:MatDialog, private _bookService: BooksService,private _authorService: AuthorService, private _publisherService: PublisherService) { }
	public onLoading = false;
	public authorList: IAuthor[] = [];
	public publisherList :IPublisher[] = [];
	public authorsLoaded = false;
	public publishersLoaded = false;
	public model: IBook = {};

  ngOnInit(): void {


	this._authorService.onAuthorsLoaded.subscribe(
		next => {
			this.authorList = next;
			console.log(this.authorList);
		}
	);
	this.authorsLoaded = true;
	this._authorService.getAuthors();


	this._publisherService.onPublishersLoaded.subscribe(
		next => this.publisherList = next
		
	);
	this.publishersLoaded = true;
	this._publisherService.getPublishers();
	console.log(this.publisherList);

  }

  public AddAuthors()
  {
	this.dialog.open(CreateAuthorComponent);
  }

  public AddPublishers()
  {
	this.dialog.open(CreatePublisherComponent);
  }

	public async onClick()
	{
		await this._bookService.createBook(this.model);
		this._bookService.get(true);
	}
}