import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TodoListItem, TodoService } from "../services/todo.service";

@Component({
	selector: "app-todo-list-item",
	templateUrl: "./todo-list-item.component.html",
	styleUrls: ["./todo-list-item.component.scss"]
})
export class TodoListItemComponent implements OnInit {
	public item: TodoListItem | null = null;
	constructor(private _route: ActivatedRoute, private _service: TodoService) { }

	public ngOnInit(): void {
		this._route.params.subscribe(
			next => {
				const temp = this._service.list.find(l => l.name === next["id"]);
				if (!temp) {
					throw new Error("Not found");
				}
				this.item = temp;
			}
		);
	}

}
