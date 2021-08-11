import { Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";
import { BooksService, IBook } from "../services/books.service";

@Component({
	selector: "app-start",
	templateUrl: "./start.component.html",
	styleUrls: ["./start.component.scss"]
})
export class StartComponent implements OnInit {
	public title = "BibliothekeWebsite";
	public books: IBook[] = [];
	public isDisabled = false;

	constructor(private _route: Router, private _bookService: BooksService) {}
	
	public ngOnInit(): void {
		this._bookService.onBooksLoaded.subscribe(
			next => this.books = next
		);
	}

	/** Toggles the input field */
	public toggleDisable(): void {
		this.isDisabled = !this.isDisabled;
	}

	public loadBooks(): void {
		// this._bookService.get();
		this._route.navigate(["/books"]);
	}

	public gotoTodoList(): void {
		this._route.navigate(["/todo"]);
	}
}
