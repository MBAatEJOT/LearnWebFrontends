import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { StartComponent } from './start/start.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
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

@NgModule({
	declarations: [
		AppComponent,
		TodoListComponent,
		StartComponent,
		TodoListItemComponent,
		BooksComponent,
		BookViewComponent,
		PublisherViewComponent,
		AuthorViewComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatTableModule,
		MatCardModule,
		MatGridListModule,
		MatListModule,
		MatIconModule,
		MatToolbarModule,
		MatButtonModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
