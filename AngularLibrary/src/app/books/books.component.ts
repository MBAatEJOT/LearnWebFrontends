import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BooksService, IBook } from "../services/books.service";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CreateBookComponent } from "../create-book/create-book.component";

@Component({
	selector: 'app-books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
	public books: IBook[] = [];
	public booksLoaded: Boolean = false;
	constructor(private _router: Router, private _bookService: BooksService,public dialog: MatDialog) { }

	public ngOnInit(): void {
		this._bookService.onBooksLoaded.subscribe(
			next => this.books = next
			
		);
		this.booksLoaded = true;
		this._bookService.get();
		console.log(this.books);
	}

	public showDetails(book: IBook): void {

		const item = book;
		console.log(item);
		this._router.navigate(["/bookView", item.id]);
	}

	public updateDetails(book: IBook): void {

		const item = book;
		console.log(item);
		this._router.navigate(["/updateBook", item.id]);
	}
	public deleteDetails(book: IBook)
	{
		const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
			data: {
			  title: 'Confirm Remove Book',
			  message: 'Are you sure, you want to remove the Book: ' + book.title
			}
		 });
		 confirmDialog.afterClosed().subscribe(result => {
			if (result === true) {
		this._bookService.deleteBook(book.id)  ;
		
		 }
		 
		 });
		 this._bookService.get(true);

		
	  }
	
	public addBook()
	{
		this.dialog.open(CreateBookComponent);

	}
	
	public GotoStartPage(): void {
		this._router.navigate(["/"]);
	}

	public GoBackPage(): void {
		window.history.back();
	}
}
