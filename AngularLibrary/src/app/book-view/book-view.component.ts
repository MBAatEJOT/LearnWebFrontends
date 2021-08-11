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
	private onAuthorsLoaded: Subscription;
	public allAuthors: IAuthor[] = [];
	private _bookId: number;
	private _onBookLoadedSubscription: Subscription = null;
	private _onPublisherLoadedSubscription: Subscription = null;
	private _onAuthorLoadedSubscription: Subscription = null;
	public books: IBook[] = [];
	public item: IBook = null;
	public authorNames:string[] = [];
	public publisherNames:string[] = [];
	public booksLoaded = false;

	public allPublishers: IPublisher[] = [];
	private bookPublishers: IPublisher[] = [];
	public publishersNames: string[] = [];
	private onPublishersLoaded: Subscription;

	constructor(private _route: ActivatedRoute, private _router: Router, private _service: BooksService, private _authorService: AuthorService,
		           private _publisherService: PublisherService) {
	
	}
	public ngOnDestroy(): void {
		this._onBookLoadedSubscription.unsubscribe();
		this._onPublisherLoadedSubscription.unsubscribe();
		this._onAuthorLoadedSubscription.unsubscribe();
	}

	public ngOnInit() {

		this._onPublisherLoadedSubscription = this._publisherService.onPublisherLoaded.subscribe(
			next => {
				this.allPublishers.push(next);
				this.item.publishersName.push(next.name);
				console.log(this.item.publishersName);

			}
		);
		this._onAuthorLoadedSubscription = this._authorService.onAuthorLoaded.subscribe(
			next => {
				this.allAuthors.push(next);
				this.item.authorsName.push(next.firstName + "," + next.lastName);
				console.log(this.item.authorsName);
			}
		);
		this._onBookLoadedSubscription = this._service.onBookLoaded.subscribe(
			next => {
				this.item = next;
				this.item.authorsName = this.authorNames;
				this.item.publishersName = this.publisherNames;
				this.books.push(next);
				this.booksLoaded = true;

				for (let i = 0; i < this.item.publishers.length; i++) {
					const element = this.item.publishers[i];
					this._publisherService.getById(element);
				}
				for (let i = 0; i < this.item.authors.length; i++) {
					const authorElement = this.item.authors[i];
					this._authorService.getById(authorElement);

							}
			}
		);
		this._route.params.subscribe(
			next => {
				this._bookId = Number(next["id"]);
				if (!!this._bookId) {
					this._service.getById(this._bookId);
				}
			}

		);

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


