import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorViewComponent } from "./author-view/author-view.component";
import { BookViewComponent } from "./book-view/book-view.component";
import { BooksComponent } from "./books/books.component";
import { PublisherViewComponent } from "./publisher-view/publisher-view.component";
import { UpdateBookComponent } from "./update-book/update-book.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { AuthorListComponent } from "./author-list/author-list.component";
import { UpdateAuthorComponent } from "./update-author/update-author.component";
import { PublisherListComponent } from "./publisher-list/publisher-list.component";
import { UpdatePublisherComponent } from "./update-publisher/update-publisher.component";

const routes: Routes = [
	 { path: "", component: WelcomeComponent},
	{ path: "authors", component: AuthorListComponent },
	{ path: "updateAuthor/:id", component: UpdateAuthorComponent },
	{ path: "books", component: BooksComponent },
	{ path: "bookView/:id", component: BookViewComponent},
	{ path: "publisherView/:id", component: PublisherViewComponent},
	{ path: "authorView/:id", component: AuthorViewComponent},
	{ path: "updateBook/:id", component: UpdateBookComponent},
	{ path: "publishers", component: PublisherListComponent },
	{ path: "updatePublisher/:id", component: UpdatePublisherComponent },
	
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
