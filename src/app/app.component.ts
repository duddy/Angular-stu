import { Component } from '@angular/core';
import { SidebarMenu } from './scm-main/sidebar/sidebar.component';

@Component({
  selector: 'poc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentMenu: SidebarMenu;
}
