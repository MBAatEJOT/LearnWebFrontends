import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

export interface IAuthor {
	id: number;
	firstName: string;
	lastName: string;
	books: number[];
}

@Injectable({
	providedIn: "root"
})
export class AuthorService {

	private _authorsLoaded = new Subject<IAuthor[]>();
	private _authorLoaded = new Subject<IAuthor>();

	public onAuthorsLoaded = this._authorsLoaded.asObservable();
	public onAuthorLoaded = this._authorLoaded.asObservable();

	private _list: IAuthor[] = [];
	private _authorDatalist: IAuthor[] = [];

	constructor(private _http: HttpClient) { }

	public getAuthors(): void {
		if (!!this._list) {
			this._authorsLoaded.next(this._list);
			return;
		}
		this._http.get<IAuthor[]>("/assets/data/authors/all.json").subscribe(
			next => {
				this._list = next;
				this._authorsLoaded.next(next);
			}
		);
	}

	public getById(id: number) {
		this._http.get<IAuthor>(`/assets/data/authors/${id}.json`).subscribe(
			next => this._authorLoaded.next(next)
		);
	}

}
