import { Injectable } from "@angular/core";

export class TodoListItem {
	constructor(public name: string, public done = false) { }
}

@Injectable({
	providedIn: "root"
})
export class TodoService {

	private _list: TodoListItem[] = [];

	constructor() { }

	public get list(): TodoListItem[] {
		return this._list;
	}

	public add(item: TodoListItem): void {
		this._list.push(item);
	}

}
