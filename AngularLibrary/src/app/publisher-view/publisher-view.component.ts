import { Component, OnInit, OnDestroy } from '@angular/core';
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
	private onPublishersLoadedByBook :Subscription;
	public allBooks: IBook[] = [];
	public bookTitles: string[] = [];

	public pitem: IPublisher = null;
	private _publisherId: number;
	public isLoading = false;

	constructor(private _route: ActivatedRoute, private _router: Router, private _service: BooksService,
		private _publisherService: PublisherService) {
	}

	public ngOnInit() {

		this.onPublishersLoadedByBook = this._service.onBooksLoadedByPublisher.subscribe(
			next => {
				this.allBooks = next;
			}
		);

		this.isLoading = true;
		this._route.params.subscribe(
			async next => {
				this._publisherId = Number(next["id"]);
				if (!!this._publisherId) {
					this.pitem = await this._publisherService.getById(this._publisherId);
					this._service.getByPublisherId(this.pitem.id);
					this.isLoading= false;
					console.log(this.pitem);
				}

			});
	}

	public showBookDetails(book: IBook): void {

		if (book) {
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


