import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { BooksComponent } from "../books/books.component";
import { BooksService, IBook } from "../services/books.service";
import { Subscription } from "rxjs";
import { PublisherService, IPublisher } from "../services/publisher.service";


@Component({
  selector: 'app-publisher-view',
  templateUrl: './publisher-view.component.html',
  styleUrls: ['./publisher-view.component.scss']
})
export class PublisherViewComponent implements OnInit {

	private onBooksLoaded: Subscription;
	public allBooks: IBook[] = [];
	public bookTitles: string[] = [];
	public item: IPublisher | null = null;
	private _publisherId: number;

	private _onBookLoadedSubscription: Subscription = null;
	private _onPublisherLoadedSubscription: Subscription = null;

	constructor(private _route: ActivatedRoute, private _router: Router , private _service: BooksService,
					private _publisherService:PublisherService) {
}

public ngOnDestroy(): void {
	this._onPublisherLoadedSubscription.unsubscribe();
	this._onBookLoadedSubscription.unsubscribe();

}
	public async ngOnInit(): Promise<void> {
		await new Promise(f => setTimeout(f, 1000));

		this._route.params.subscribe(
			next => {
				this._publisherId = Number(next["id"]);
				console.log(this._publisherId);
				if (!!this._publisherId) {
					this._publisherService.getById(this._publisherId);
				}

			});

		this._onPublisherLoadedSubscription = this._publisherService.onPublisherLoaded.subscribe(
			next => {
				this.item = next;
				console.log(this.item);
				for (let i = 0; i < this.item.books.length; i++) {
					const element = this.item.books[i];
					this._service.getById(element);
				}
			}
		);

		this._onBookLoadedSubscription = this._service.onBookLoaded.subscribe(
			next => {
				this.allBooks.push(next);
			}
		);
			}

	public showBookDetails(book: IBook): void {

		if (book)
		{
				const item = book;
				this._router.navigate(["/bookView", item.id]);
		}
	}

	public GotoStartPage(): void {
		this._router.navigate(["/"]);
	}

	public GoBackPage(): void {
		window.history.back();
	}
}


