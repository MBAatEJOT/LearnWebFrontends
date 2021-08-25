import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { PublisherService, IPublisher } from '../services/publisher.service';


@Component({
  selector: 'app-create-publisher',
  templateUrl: './create-publisher.component.html',
  styleUrls: ['./create-publisher.component.scss']
})
export class CreatePublisherComponent implements OnInit {

	constructor(private _route: ActivatedRoute, private _publisherService: PublisherService) { }
	public model: IPublisher = {};

  ngOnInit(): void {
  }

	public async onClick()
	{
		console.log(this.model);
		await this._publisherService.createPublisher(this.model);
		this._publisherService.getPublishers(true);
		
	}
}