import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionAuthGuardService {

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private afAuth: AngularFireAuth) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.afAuth.authState.pipe(
      take(1),
      map(user => !!user),
      tap(authenticated => {
        if (!authenticated) {
          this.toastr.error('Please Login', '[Error]');
          this.router.navigate(['/']);
        }
      }));
  }
}
