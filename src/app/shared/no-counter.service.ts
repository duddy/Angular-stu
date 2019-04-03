import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ScmDomain } from './scm-shared-util';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class NoCounterService {

  constructor(private db: AngularFireDatabase) { }

  get(domain: ScmDomain): Observable<any> {
    return this._getNumber$(domain).snapshotChanges().pipe(map( o => o.payload.val() || 0));
  }

  private _getNumber$(domain: ScmDomain) {
    return this.db.object(`/number/${domain}`);
  }

  incAndGet(domain: ScmDomain): Observable<number> {
    const id$ = new EventEmitter<number>();

    const onComplete = (err, comitted, dataSnapshot) => {
      if (err) throw new Error(`failed to increase number`);

      if ( comitted ) {
        id$.emit(dataSnapshot.val());
        id$.complete();
      }
    };
    this.db.database.ref(`/number/${domain}`).transaction(num => (num || 0) +1, onComplete);

    return id$;
  }
  
}
