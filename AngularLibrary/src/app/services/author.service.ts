import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { IBook } from "./books.service";

export interface IAuthor {
	id?: number;
	firstName?: string;
	lastName?: string;
	books?: IBook[];
}

@Injectable({
	providedIn: "root"
})
export class AuthorService {

	private _authorsLoaded = new Subject<IAuthor[]>();
	public onAuthorsLoaded = this._authorsLoaded.asObservable();

	private _list: IAuthor[] = [];
	private _authorDatalist: IAuthor[] = [];
	private _authorsLoadedByBook = new Subject<IAuthor[]>();
	public onAuthorsLoadedByBook = this._authorsLoadedByBook.asObservable();

	constructor(private _http: HttpClient) { }

	public getAuthors(forceReload: boolean = false): void{
		if (!!this._list && this._list.length > 0 && !forceReload) {
			this._authorsLoaded.next(this._list);
			return;
		}
		this._http.get<IAuthor[]>("/api/author/getList").subscribe(
			next => {
				this._list = next;
				console.log(next);
				this._authorsLoaded.next(next);
			}
		);
	}
	public getByBookId(id: number) {
		this._http.get<IAuthor[]>(`/api/author/GetByBookId/${id}`).subscribe(
			next => this._authorsLoadedByBook.next(next)
		);
	}


	
	public async getById(id: number): Promise<IAuthor> {
		return await this._http.get<IAuthor>(`/api/author/GetListbyID/${id}`).toPromise();
	}

	public async updateAuthor(author: IAuthor): Promise<IAuthor> {
		console.log(author);
		let result = await this._http.put<IAuthor>(`/api/author/UpdateAuthor/${author.id}`, author).toPromise();
		console.log(result);
		return result;
	}

	public async createAuthor(author: IAuthor): Promise<IAuthor> {
		return await this._http.post<IAuthor>("/api/author/createAuthor", author).toPromise();
	}
		

	public async deleteAuthor(id: number): Promise<IAuthor> {
		let result =  await this._http.delete<IAuthor>(`/api/author/deleteAuthor/${id}`).toPromise();
		this.getAuthors(true);
		return result;
		
		
			}

	public get list(): IAuthor[] {
		return this._list;

	}

}
