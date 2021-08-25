import { Component, OnInit,ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import {MatDialog} from '@angular/material/dialog';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnDestroy {
	mobileQuery: MediaQueryList;

		 
private _mobileQueryListener: () => void;
constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
	this.mobileQuery = media.matchMedia('(max-width: 600px)');
	this._mobileQueryListener = () => changeDetectorRef.detectChanges();
	this.mobileQuery.addListener(this._mobileQueryListener);
 }

 ngOnDestroy(): void {
	this.mobileQuery.removeListener(this._mobileQueryListener);
 }

//  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}



//   constructor(private _router: Router,public dialog: MatDialog) { }

//   ngOnInit(): void {
//   }

// public Books()
// {
// 	this._router.navigate(["/books"]);
// }
// public Authors()
// {
// 	this._router.navigate(["/authors"]);
// }
// public Publishers()
// {
// 	this._router.navigate(["/publishers"]);
// }



// }
