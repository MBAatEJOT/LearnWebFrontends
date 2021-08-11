import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { AuthorService } from "./author.service";

export interface IBook {
	id: number;
	title: string;
	publishers: number[];
	publishersName:string[];
	location: string;
	authors: number[];
	authorsName:string[];

}

@Injectable({
	providedIn: "root"
})
export class BooksService {
	private _booksLoaded = new Subject<IBook[]>();
	private _bookLoaded = new Subject<IBook>();

	public onBooksLoaded = this._booksLoaded.asObservable();
	public onBookLoaded = this._bookLoaded.asObservable();


	constructor(private _http: HttpClient) {

	}

	public get(): void {
		if (!!this._list) {
			this._booksLoaded.next(this._list);
			return;
		}
		this._http.get<IBook[]>("/assets/data/books/all.json").subscribe(
			next => {
				this._list = next;
				this._booksLoaded.next(next);
			}
		);
	}

	public getById(id: number) {
		this._http.get<IBook>(`/assets/data/books/${id}.json`).subscribe(
			next => this._bookLoaded.next(next)
		);
	}

	private _list: IBook[] = null;



	public get list(): IBook[] {
		return this._list;

	}

}
