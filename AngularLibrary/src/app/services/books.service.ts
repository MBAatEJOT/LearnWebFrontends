import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { AuthorService, IAuthor } from "./author.service";
import { IPublisher } from "./publisher.service";
import { nextTick } from "process";

export interface IBook {
	id?: number;
	title?: string;
	PublisherIds?: number[];
	AuthorIds?: number[];
	publishersName?: string[];
	location?: string;
	
	authorsName?: string[];

}

@Injectable({
	providedIn: "root"
})
export class BooksService {
	private _booksLoaded = new Subject<IBook[]>();
	public onBooksLoaded = this._booksLoaded.asObservable();

	
	private _booksLoadedByAuthor = new Subject<IBook[]>();
	public onBooksLoadedByAuthor = this._booksLoadedByAuthor.asObservable();
	
	private _booksLoadedByPublisher = new Subject<IBook[]>();
	public onBooksLoadedByPublisher = this._booksLoadedByPublisher.asObservable();

	constructor(private _http: HttpClient) {

	}

	public get(forceReload: boolean = false): void {
		if (!!this._list && !forceReload) {
			this._booksLoaded.next(this._list);
			return;
		}
		this._http.get<IBook[]>("/api/book/getList").subscribe(
			next => {
				this._list = next;
				console.log(next);
				this._booksLoaded.next(next);
			}
		);
	}

	public async getById(id: number): Promise<IBook> {
		return await this._http.get<IBook>(`/api/book/GetListbyID/${id}`).toPromise();
	}

	public getByAuthorId(id: number) {
		this._http.get<IAuthor[]>(`/api/author/GetByAuthorId/${id}`).subscribe(
			next => 
			{
				this._booksLoadedByAuthor.next(next);
				console.log(next);
			}
			
		);
	}

	public getByPublisherId(id: number) {
		this._http.get<IAuthor[]>(`/api/publisher/GetByPublisherId/${id}`).subscribe(
			next => 
			{
				this._booksLoadedByPublisher.next(next);
				console.log(next);
			}
			
		);
	}

	public async updateBook(book: IBook): Promise<IBook> {
		console.log(book);
		let result = await this._http.put<IBook>(`/api/book/UpdateBook/${book.id}`, book).toPromise();
		console.log(result);
		return result;
		
	}

	public async createBook(book: IBook): Promise<IBook> {
		console.log(book);
		return await this._http.post<IBook>("/api/book/CreateBook", book).toPromise();
	}
		

	public async deleteBook(id: number): Promise<IBook> {
		let result = await this._http.delete<IBook>(`/api/book/DeleteBook/${id}`).toPromise();
		this.get(true);
		return result;
			}
		

	private _list: IBook[] = null;



	public get list(): IBook[] {
		return this._list;

	}

}
