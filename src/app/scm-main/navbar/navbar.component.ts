import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { ProductSearchService } from './product-search.service';
import { Router, NavigationExtras } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'poc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appTitle = 'Product Management';
  session$: Observable<boolean>;
  sessionBtnName = 'login';
  searchNum = '';
  

  constructor(private afAuth: AngularFireAuth, 
    private serchProduct: ProductSearchService, 
    private router: Router,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.session$ = this.afAuth.authState.pipe(map(user => !!user));
    this.session$.subscribe(auth => this.sessionBtnName = auth ? 'logout' : 'login');
  }

  checkSession() {
    this.session$.pipe( take(1) ).subscribe(s => s ? this.afAuth.auth.signOut() : 
      this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()));

  }

  searchProduct(no) {
    this.serchProduct.searchProduct(no).subscribe((payloay)=> {
      if(no == '' || !payloay ) {
        this.toastr.error(`Product ${no} is not exists`,'Search fail');
      } else {
        let navigationExtras: NavigationExtras = {
          queryParams: {action: 'edit'}
        };
        this.router.navigate(['product-list', 'product', no], navigationExtras);
      }
    });
  }
}
