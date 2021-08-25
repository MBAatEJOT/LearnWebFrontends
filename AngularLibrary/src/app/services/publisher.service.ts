import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { IBook } from "./books.service";

export interface IPublisher {
	id?: number;
	name?: string;
	books?: IBook[];
}

@Injectable({providedIn: "root"
})

export class PublisherService {
	private _publishersLoadedByBook = new Subject<IPublisher[]>();

	public publishersLoaded = new Subject<IPublisher[]>();

	public onPublishersLoaded = this.publishersLoaded.asObservable();
	public onPublishersLoadedByBook = this._publishersLoadedByBook.asObservable();

	 private _list: IPublisher[] = [];

	constructor(private _http: HttpClient) { }

	public async getPublishers(forceReload: boolean = false): Promise<void> {
		if (!!this._list && this._list.length > 0 && !forceReload)  {
		this.publishersLoaded.next(this._list);
		return;
	}
	 this._http.get<IPublisher[]>("/api/publisher/getList").subscribe(
		next => {
			this._list = next;
			this.publishersLoaded.next(next);
		}
	);

	}

	public getByBookId(id: number) {
		this._http.get<IPublisher[]>(`/api/publisher/GetByBookId/${id}`).subscribe(
			next => 
			{
				this._publishersLoadedByBook.next(next);
				console.log(next);
			}
			
		);
	}
	
	public async getById(id: number): Promise<IPublisher> {
		return await this._http.get<IPublisher>(`/api/publisher/GetListbyID/${id}`).toPromise();
	}

	public async updatePublisher(publisher: IPublisher): Promise<IPublisher> {
		return await this._http.put<IPublisher>(`/api/publisher/UpdatePublisher/${publisher.id}`, publisher).toPromise();
	}

	public async createPublisher(publisher: IPublisher): Promise<IPublisher> {
		return await this._http.post<IPublisher>("/api/publisher/CreatePublisher/", publisher).toPromise();
	}
		

	public async deletePublisher(id: number): Promise<IPublisher> {
		let result = await this._http.delete<IPublisher>(`/api/publisher/DeletePublisher/${id}`).toPromise();
		this.getPublishers(true);
		return result;
			}

	public get list(): IPublisher[] {
		return this._list;

}
}




