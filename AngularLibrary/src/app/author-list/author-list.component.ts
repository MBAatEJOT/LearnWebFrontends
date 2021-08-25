import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthorService, IAuthor } from "../services/author.service";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CreateAuthorComponent } from '../create-author/create-author.component';


@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {
	public authors: IAuthor[] = [];
	public authorsLoaded: Boolean = false;
	constructor(private _router: Router, private _authorService: AuthorService,private dialog:MatDialog) { }

	public ngOnInit(): void {
		this._authorService.onAuthorsLoaded.subscribe(
			next => this.authors = next
			
		);
		this.authorsLoaded = true;
		this._authorService.getAuthors();
	}

	public ShowDetails(author: IAuthor): void {

		const item = author;
		this._router.navigate(["/authorView", item.id]);
	}

	public UpdateDetails(author: IAuthor): void {

		const item = author;
		this._router.navigate(["/updateAuthor", item.id]);

	}

	public AddAuthors()
	{
		this.dialog.open(CreateAuthorComponent);
	}

	public DeleteDetails(author:IAuthor): void {

		const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
			data: {
			  title: 'Confirm Remove Author',
			  message: 'Are you sure, you want to remove the Author: ' + author.firstName + ',' + author.lastName
			}
		 });
		 confirmDialog.afterClosed().subscribe(result => {
			if (result === true) {
		this._authorService.deleteAuthor(author.id)  ;
		 }
		 });

	}

	public GotoStartPage(): void {
		this._router.navigate(["/"]);
	}
	public GoBackPage(): void {
		window.history.back();
	}

}