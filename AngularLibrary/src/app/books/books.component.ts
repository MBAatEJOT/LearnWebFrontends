import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BooksService, IBook } from "../services/books.service";
import { AuthorService, IAuthor } from "../services/author.service";
import { LayoutModule } from '@angular/cdk/layout';

@Component({
	selector: 'app-books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
	public authorName = "";
	public books: IBook[] = [];
	displayedColumns: string[] = ['image','title', 'location'];
	public booksLoaded: Boolean = false;
	constructor(private _router: Router, private _bookService: BooksService) { }

	public ngOnInit(): void {
		this._bookService.onBooksLoaded.subscribe(
			next => this.books = next
			
		);
		this.booksLoaded = true;
		this._bookService.get();
		console.log(this.books);
	}

	selectedBook?: IBook;
	authors?: IAuthor;

	public showDetails(book: IBook): void {

		const item = book;
		console.log(item);
		this._router.navigate(["/bookView", item.id]);
	}

}




