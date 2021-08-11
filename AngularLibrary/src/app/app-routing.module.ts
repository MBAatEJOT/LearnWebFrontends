import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorViewComponent } from "./author-view/author-view.component";
import { BookViewComponent } from "./book-view/book-view.component";
import { BooksComponent } from "./books/books.component";
import { PublisherViewComponent } from "./publisher-view/publisher-view.component";
import { StartComponent } from "./start/start.component";
import { TodoListItemComponent } from "./todo-list-item/todo-list-item.component";
import { TodoListComponent } from "./todo-list/todo-list.component";

const routes: Routes = [
	{ path: "", component: BooksComponent },
	{ path: "todo", component: TodoListComponent },
	{ path: "item/:id", component: TodoListItemComponent },
	{ path: "bookView/:id", component: BookViewComponent},
	{ path: "publisherView/:id", component: PublisherViewComponent},
	{ path: "authorView/:id", component: AuthorViewComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
