import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthorService, IAuthor } from '../services/author.service';
import { BooksService, IBook } from '../services/books.service';
import { IPublisher, PublisherService } from '../services/publisher.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateAuthorComponent } from '../create-author/create-author.component';
import { CreatePublisherComponent } from '../create-publisher/create-publisher.component';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {

	private _bookId: number;
	public item: IBook = null;
	public isLoading = false;
	public authorList: IAuthor[] = [];
	public publisherList :IPublisher[] = [];
	public authorsLoaded = false;
	public publishersLoaded = false;
	public model: IBook = {};
	private onPublishersLoadedByBook: Subscription;
	public authors: IAuthor[] = [];
	private onAuthorsLoadedByBook:Subscription;
	public publishers: IPublisher[] = [];
	public modelPublishers: number[];
	public modelAuthors: number[];
	public selectedPublisher :number;

	constructor(private _route: ActivatedRoute, private dialog:MatDialog, private _router: Router, private _service: BooksService, private _authorService: AuthorService,
		private _publisherService: PublisherService) {

}

  public ngOnInit(): void {
	this.isLoading = true;

	this.onPublishersLoadedByBook = this._publisherService.onPublishersLoadedByBook.subscribe(
		next => 
		{
			if (!this.model.PublisherIds) {
				this.model.PublisherIds = [];
			}
			this.publishers = next;
			this.publishers.forEach(p => 
				{
					this.model.PublisherIds.push(p.id);
				});
		}
	);

	this.onAuthorsLoadedByBook = this._authorService.onAuthorsLoadedByBook.subscribe(
		next => {
			if(!this.model.AuthorIds)
			{
				this.model.AuthorIds=[];
			}
			this.authors = next;
			this.authors.forEach(a => 
				{
					this.model.AuthorIds.push(a.id);
				});

			
		}
	);


	this._route.params.subscribe(
		async next => {
			this._bookId = Number(next["id"]);
			if (!!this._bookId) {
				this.item = this.model = await this._service.getById(this._bookId);
				console.log(this.model);
				 this._publisherService.getByBookId(this.item.id);
					this._authorService.getByBookId(this.item.id);
				console.log(this.item);
				this.isLoading = false;
			}
		}

	);
	this._authorService.onAuthorsLoaded.subscribe(
		next => {
			this.authorList = next;
			
		}
	);
	this.authorsLoaded = true;
	this._authorService.getAuthors();
	console.log(this.authorList);

	this._publisherService.onPublishersLoaded.subscribe(
		next => this.publisherList = next
		
	);
	this.publishersLoaded = true;
	this._publisherService.getPublishers();
	console.log(this.publisherList);
  }

  public async onClick()
	{
		this.model.id = this.item.id;
		let result = await this._service.updateBook(this.model);
		if(result != null)
		{
			alert("Update completed");
			window.history.back();

		}
	}
	public AddAuthors()
	{
	 this.dialog.open(CreateAuthorComponent);
	}
 
	public AddPublishers()
	{
	 this.dialog.open(CreatePublisherComponent);
	}
	public GoBackPage(): void {
		window.history.back();
	}

}
