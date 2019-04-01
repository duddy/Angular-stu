import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'poc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appTitle = 'Product Management';

  constructor() {}
  ngOnInit() {}

  searchProduct(no: number) {
    console.log(`search: ${no}`);
  }
}
