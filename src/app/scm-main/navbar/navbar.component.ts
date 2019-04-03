import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Component({
  selector: 'poc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appTitle = 'Product Management';
  session$: Observable<boolean>;
  sessionBtnName = 'login';
  

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.session$ = this.afAuth.authState.pipe(map(user => !!user));
    this.session$.subscribe(auth => this.sessionBtnName = auth ? 'logout' : 'login');
  }

  checkSession() {
    this.session$.pipe( take(1) ).subscribe(s => s ? this.afAuth.auth.signOut() : 
      this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()));

  }

  searchProduct(no: number) {
    console.log(`search: ${no}`);
  }
}
