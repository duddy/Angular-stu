import { Component, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  constructor(private toaster: ToastrService, vRef: ViewContainerRef) {

    this.toaster.success('HI there');
  }
}
