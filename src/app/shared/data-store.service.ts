import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NoCounterService } from './no-counter.service';
import { ScmDomain } from './scm-shared-util';
import { take, switchMap } from 'rxjs/operators';
import { FirebaseListFactoryOpts } from '@angular/fire/database-deprecated/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  constructor(
    private db: AngularFireDatabase,
    private counter: NoCounterService) {

    }

    create(domain: ScmDomain, modelCreatorFn: (number)=>any) {
      return this.counter.incAndGet(domain).pipe(switchMap( no => this.findObject$(domain,no).set(modelCreatorFn(no))));
    }

    findObject$(domain: ScmDomain, no: number) {
      return this._findObject(domain, no, false);
    }

    findObjectSnapshot(domain: ScmDomain, no: number) {
      return this._findObject(domain, no, true).snapshotChanges().pipe(take(1));
    }

    private _findObject(domain:ScmDomain, no: number, isSnapshop: boolean) {
      if (isSnapshop) {
        return this.db.object(`/${domain}/${no}`);
      }
      return this.db.object(`/${domain}/${no}`);
    }

    findList$(domain: ScmDomain) {
      return this.db.list(`/${domain}`);
    }

    findList$ByQuery(domain: ScmDomain, queryKey: string, queryVal: any) {
      const optionFunc = (ref) => {ref.orderByChild(queryKey).equalTo(queryVal)};
      return this._findListByOpt(domain, optionFunc).valueChanges().pipe(take(1));
    }

    findList$ByPage(domain: ScmDomain, pageNo, pageSize, totalCnt){
      const offset = totalCnt - pageSize * (pageNo - 1);
      const optionFunc = (ref) => {ref.orderByChild('no').endAt(offset).limitToLast(pageSize)};
      return this._findListByOpt(domain, optionFunc);
    }

    private _findListByOpt(domain: ScmDomain, optionFunc) {
      return this.db.list(`/${domain}`, optionFunc);
    }

    update(domain: ScmDomain, model: any) {
      return this.findObject$(domain, model.no).update(model);
    }

    count(domain: ScmDomain) {
      return this.counter.get(domain);
    }

}
