import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BooksComponent } from './books/books.component';
import { BookViewComponent } from './book-view/book-view.component';
import { PublisherViewComponent } from './publisher-view/publisher-view.component';
import { AuthorViewComponent } from './author-view/author-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule} from '@angular/material/card';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { WelcomeComponent } from './welcome/welcome.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateBookComponent } from './create-book/create-book.component';
import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from "@angular/material/input";
import { UpdateBookComponent } from './update-book/update-book.component';
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { AuthorListComponent } from './author-list/author-list.component';
import { CreateAuthorComponent } from './create-author/create-author.component';
import { UpdateAuthorComponent } from './update-author/update-author.component';
import { PublisherListComponent } from './publisher-list/publisher-list.component';
import { CreatePublisherComponent } from './create-publisher/create-publisher.component';
import { UpdatePublisherComponent } from './update-publisher/update-publisher.component';
import { MatSidenavModule } from '@angular/material/sidenav';
@NgModule({
	declarations: [
		AppComponent,
		BooksComponent,
		BookViewComponent,
		PublisherViewComponent,
		AuthorViewComponent,
  WelcomeComponent,
  CreateBookComponent,
  UpdateBookComponent,
  ConfirmDialogComponent,
  AuthorListComponent,
  CreateAuthorComponent,
  UpdateAuthorComponent,
  PublisherListComponent,
  CreatePublisherComponent,
  UpdatePublisherComponent
	],
entryComponents:[CreateBookComponent,ConfirmDialogComponent,CreateAuthorComponent,CreatePublisherComponent],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		MatTableModule,
		MatCardModule,
		MatGridListModule,
		MatListModule,
		MatIconModule,
		MatToolbarModule,
		MatButtonModule,
		MatDialogModule,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule,
		MatSidenavModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
