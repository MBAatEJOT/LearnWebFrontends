import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

export interface IPublisher {
	id: number;
	name: string;
	books: number[];
}

@Injectable({providedIn: "root"
})

export class PublisherService {

	public publishersLoaded = new Subject<IPublisher[]>();
	public _publisherLoaded = new Subject<IPublisher>();

	public onPublishersLoaded = this.publishersLoaded.asObservable();
	public onPublisherLoaded = this._publisherLoaded.asObservable();

	 private _list: IPublisher[] = [];
	// private _publisherDatalist: IPublisher[] = [];

	constructor(private _http: HttpClient) { }

	public async getPublishers(): Promise<void> {
		if (!!this._list) {
		this.publishersLoaded.next(this._list);
		return;
	}
	 this._http.get<IPublisher[]>("/assets/data/publishers/all.json").subscribe(
		next => {
			this._list = next;
			this.publishersLoaded.next(next);
		}
	);

	}

	
	public getById(id: number) {
		this._http.get<IPublisher>(`/assets/data/publisher/${id}.json`).subscribe(
			next => this._publisherLoaded.next(next)
		);
	}

	public get list(): IPublisher[] {
		return this._list;

		}

		// public add(item: IPublisher): void {
		// 	this._list.push(item);
		// }

}





