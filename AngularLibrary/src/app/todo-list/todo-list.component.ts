import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TodoService, TodoListItem } from "../services/todo.service";

@Component({
	selector: "app-todo-list",
	templateUrl: "./todo-list.component.html",
	styleUrls: ["./todo-list.component.scss"]
})
export class TodoListComponent {
	public input = "";

	constructor(private _router: Router, private _service: TodoService) { }

	public get list(): TodoListItem[] {
		return this._service.list;
	}

	public addItem(): void {
		const item = new TodoListItem(this.input);
		this._service.add(item);
		this.input = "";
	}

	public toggleItem(item: TodoListItem): void {
		item.done = !item.done;
	}

	public showDetails(item: TodoListItem): void {
		this._router.navigate(["/item", item.name]);
	}

}
