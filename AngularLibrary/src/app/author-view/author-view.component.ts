import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BooksComponent } from "../books/books.component";
import { BooksService, IBook } from "../services/books.service";
import { Subscription } from "rxjs";
import { AuthorService, IAuthor } from "../services/author.service";

@Component({
  selector: "app-author-view",
  templateUrl: "./author-view.component.html",
  styleUrls: ["./author-view.component.scss"]
})
export class AuthorViewComponent implements OnInit {

	private onBooksLoaded: Subscription;
	public allBooks: IBook[] = [];
	public item: IAuthor | null = null;
	private _authorId: number;
	private _onAuthorLoadedSubscription: Subscription = null;
	private _onBookLoadedSubscription: Subscription = null;

	constructor(private _route: ActivatedRoute, private _router: Router , private _service: BooksService,
					        private _authorService: AuthorService) {

		this.onBooksLoaded = this._service.onBooksLoaded.subscribe(
		next => this.allBooks = next
); }

public ngOnDestroy(): void {
	this.onBooksLoaded.unsubscribe();
	this._onAuthorLoadedSubscription.unsubscribe();

}
	public async ngOnInit(): Promise<void> {

		await new Promise(f => setTimeout(f, 1000));

		this._route.params.subscribe(
			next => {
				this._authorId = Number(next["id"]);
				if (!!this._authorId) {
					this._authorService.getById(this._authorId);
				}

			});

		this._onAuthorLoadedSubscription = this._authorService.onAuthorLoaded.subscribe(
			next => {
				this.item = next;
				console.log(this.item);
				for (let i = 0; i < this.item.books.length; i++) {
					const element = this.item.books[i];
					console.log(element);
					this._service.getById(element);
				}
			}
		);

		this._onBookLoadedSubscription = this._service.onBookLoaded.subscribe(
			next => {
				this.allBooks.push(next);
				console.log(this.allBooks);
			}
		);
			}

	public showBookDetails(book: IBook): void {

		if (book)
		{
				const item = book;
				console.log(item);
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


