import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService, IAuthor } from '../services/author.service';

@Component({
  selector: 'app-update-author',
  templateUrl: './update-author.component.html',
  styleUrls: ['./update-author.component.scss']
})
export class UpdateAuthorComponent implements OnInit {

	private _authorid: number;
	public item: IAuthor = null;
	public isLoading = false;
	public model: IAuthor = {};

	constructor(private _route: ActivatedRoute, private _router: Router, private _authorService: AuthorService) {

}

  public ngOnInit(): void {

	this.isLoading = true;

	this._route.params.subscribe(
		async next => {
			this._authorid = Number(next["id"]);
			if (!!this._authorid) {
				this.item =this.model= await this._authorService.getById(this._authorid);
				console.log(this.item);
				this.isLoading = false;
			}
		}

	);

  }

  public async onClick()
	{
		this.model.id = this.item.id;
		let result = await this._authorService.updateAuthor(this.model);
		if(result != null)
		{
			alert("Update completed");
			window.history.back();
				this._authorService.getAuthors(true);
		}
	}

	public GoBackPage(): void {
		window.history.back();
	}

}
