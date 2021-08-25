import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublisherService, IPublisher } from '../services/publisher.service';

@Component({
  selector: 'app-update-publisher',
  templateUrl: './update-publisher.component.html',
  styleUrls: ['./update-publisher.component.scss']
})
export class UpdatePublisherComponent implements OnInit {

	private _publisherid: number;
	public item: IPublisher = null;
	public isLoading = false;
	public model: IPublisher = {};

	constructor(private _route: ActivatedRoute, private _router: Router, private _publisherservice: PublisherService) {

}

  public ngOnInit(): void {

	this.isLoading = true;

	this._route.params.subscribe(
		async next => {
			this._publisherid = Number(next["id"]);
			if (!!this._publisherid) {
				this.item =this.model= await this._publisherservice.getById(this._publisherid);
				console.log(this.item);
				this.isLoading = false;
			}
		}

	);

  }

  public async onClick()
	{
		console.log(this.model);
		if (this.model.name == null)
		{
			this.model.name = this.item.name;
		}
		
		this.model.id = this.item.id;
		console.log(this.model);
		let result = await this._publisherservice.updatePublisher(this.model);
		console.log(result);
		if(result != null)
		{
			alert("Update completed");
			window.history.back();

		}
	}

	public GoBackPage(): void {
		window.history.back();
	}

}
