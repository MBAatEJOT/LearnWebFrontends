import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BooksComponent } from "../books/books.component";
import { BooksService, IBook } from "../services/books.service";
import { AuthorService, IAuthor } from "../services/author.service";
import { Subscription } from "rxjs";
import { PublisherService, IPublisher } from "../services/publisher.service";
import { nextTick } from "process";

@Component({
	selector: "app-book-view",
	templateUrl: "./book-view.component.html",
	styleUrls: ["./book-view.component.scss"]
})
export class BookViewComponent implements OnInit, OnDestroy {

	public allAuthors: IAuthor[] = [];
	private _bookId: number;
	public books: IBook[] = [];
	public item: IBook = null;
	// public authorNames:string[] = [];
	// public publisherNames:string[] = [];
	public booksLoaded = false;
	public isLoading = false;
	public publishers: IPublisher[] = [];
	public authors: IAuthor[] = [];

	public allPublishers: IPublisher[] = [];
	private bookPublishers: IPublisher[] = [];
	public publishersNames: string[] = [];
	private onPublishersLoaded: Subscription;
	private onPublishersLoadedByBook: Subscription;

	private onAuthorsLoadedByBook:Subscription;

	constructor(private _route: ActivatedRoute, private _router: Router, private _service: BooksService, private _authorService: AuthorService,
		           private _publisherService: PublisherService) {
	
	}


	public ngOnInit() {
		this.isLoading = true;

		this.onPublishersLoadedByBook = this._publisherService.onPublishersLoadedByBook.subscribe(
			next => 
			{
				this.publishers = next;
				// console.log(this.publishers);
			}
		);

		this.onAuthorsLoadedByBook = this._authorService.onAuthorsLoadedByBook.subscribe(
			next => {
				this.authors = next;
				// console.log(this.authors);
			}
		);
		
		
		this._route.params.subscribe(
			async next => {
				this._bookId = Number(next["id"]);
				if (!!this._bookId) {
					this.item = await this._service.getById(this._bookId);
					this._publisherService.getByBookId(this.item.id);
					this._authorService.getByBookId(this.item.id);
					console.log(this.item);
					this.isLoading = false;
				}
			}

		);

	}

	public ngOnDestroy() {
		this.onPublishersLoadedByBook.unsubscribe();
	}

	public showPublisherDetails(publisher: IPublisher): void {

		if (publisher) {
			const item = publisher;
			this._router.navigate(["/publisherView", item.id]);
		}

	}

	public showAuthorDetails(author: IAuthor): void {

		if (author) {
			const item = author;
			this._router.navigate(["/authorView", item.id]);
		}

		}

	public GotoStartPage(): void {
		this._router.navigate(["/"]);
	}

	public GoBackPage(): void {
		window.history.back();
	}


}


