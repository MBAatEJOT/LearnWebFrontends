import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PublisherService, IPublisher } from "../services/publisher.service";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CreatePublisherComponent } from '../create-publisher/create-publisher.component';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.scss']
})
export class PublisherListComponent implements OnInit {
	public publisherName = "";
	public publishers: IPublisher[] = [];
	public publishersLoaded: Boolean = false;
	constructor(private _router: Router, private _publisherService: PublisherService,private dialog:MatDialog) { }

	public ngOnInit(): void {
		this._publisherService.onPublishersLoaded.subscribe(
			next =>
			{
				this.publishers = next;

			} 
			
		);
		this.publishersLoaded = true;
		this._publisherService.getPublishers();
	}

	public showDetails(publisher: IPublisher): void {

		const item = publisher;
		console.log(item);
		this._router.navigate(["/publisherView", item.id]);
	}

	public updateDetails(publisher:IPublisher): void {
		const item = publisher;
		console.log(item);
		this._router.navigate(["/updatePublisher", item.id]);
	}

	public deleteDetails(publisher: IPublisher): void{
		const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
			data: {
			  title: 'Confirm Remove Publisher',
			  message: 'Are you sure, you want to remove the Publisher: ' + publisher.name
			}
		 });
		 confirmDialog.afterClosed().subscribe(result => {
			if (result === true) {
		this._publisherService.deletePublisher(publisher.id)  ;
		 }
		 });
	}

	public AddPublisher()
	{
		this.dialog.open(CreatePublisherComponent);
	}

	public GotoStartPage(): void {
		this._router.navigate(["/"]);
	}
	public GoBackPage(): void {
		window.history.back();
	}

}