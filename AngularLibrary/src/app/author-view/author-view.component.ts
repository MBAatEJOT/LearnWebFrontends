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
	private onBooksLoadedByAuthor: Subscription;
	public allBooks: IBook[] = [];
	public item: IAuthor | null = null;
	private _authorId: number;
	public onLoading = false;

	constructor(private _route: ActivatedRoute, private _router: Router , private _service: BooksService,
					        private _authorService: AuthorService) {

		this.onBooksLoaded = this._service.onBooksLoaded.subscribe(
		next => this.allBooks = next
); }



	public  ngOnInit() {


		this.onBooksLoadedByAuthor = this._service.onBooksLoadedByAuthor.subscribe(
			next => {
				this.allBooks = next;
				console.log(next);
				console.log(this.allBooks);
			}
		);

		this.onLoading = true;
		this._route.params.subscribe(
			async next => {
				this._authorId = Number(next["id"]);
				if (!!this._authorId) {
					this.item = await this._authorService.getById(this._authorId);
					this._service.getByAuthorId(this.item.id);
					this.onLoading = false;
					console.log(this.item);
				}

			});

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


