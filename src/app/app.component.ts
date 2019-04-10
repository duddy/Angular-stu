import { Component, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { SpinnerService } from './shared/loading-spinner/spinner.service';
@Component({
  selector: 'poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  constructor(private toaster: ToastrService, vRef: ViewContainerRef, router: Router, spinner: SpinnerService) {
    this.toaster.success('HI there');
    router.events.subscribe( (e: RouterEvent) => this.handleRouteEvent(spinner, e));
  }

  handleRouteEvent(spinner: SpinnerService, e:RouterEvent): void {
    if( e instanceof NavigationStart) spinner.start();

    const isNavigationEnd = e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError;
    console.log(e);
    if( isNavigationEnd ) spinner.stop();
  }
}
