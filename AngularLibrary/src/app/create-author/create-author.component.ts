import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AuthorService, IAuthor } from '../services/author.service';

@Component({
  selector: 'app-create-author',
  templateUrl: './create-author.component.html',
  styleUrls: ['./create-author.component.scss']
})
export class CreateAuthorComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _authorService: AuthorService) { }

	public model: IAuthor = {};

  ngOnInit(): void {
  }

	public async onClick()
	{
		console.log(this.model);
		await this._authorService.createAuthor(this.model);
		this._authorService.getAuthors(true);
	}
}