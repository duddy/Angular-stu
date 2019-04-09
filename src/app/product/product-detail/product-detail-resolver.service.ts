import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product, ProdStatus } from '../product.model';
import { DataStoreService } from 'src/app/shared/data-store.service';
import { Observable, Subject } from "rxjs";
import { take, map, zip} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailResolverService implements Resolve<Product> {

  constructor(private database: DataStoreService, private router: Router) {
  }

  /**
   * 商品情報とカテゴリ目録を取得
   * @param route 
   * @param state 
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const objectSnapshot$ = this.database.findObject$('product', route.params['no'])
      .snapshotChanges().pipe(take(1),map(action => {console.log(action); return action.payload.val()}));

    const usedCat$ = this.database.findList$ByQuery('category', 'isUse', true)
      .snapshotChanges().pipe(take(1),map(actions => actions.map( (action) => {return action.payload.val();})));

    const action = route.queryParams['action'];
    if (action === 'create') {
      return usedCat$.pipe(map(cats => [new Product(0, ProdStatus.WAIT_FOR_SALE), cats]));
    }

    return objectSnapshot$.pipe(zip(usedCat$), map(data => {
      console.log('--=--=--=-' + data);
      if (data[0] === null) {
        this.router.navigate(['/product-list']);
        return null;
      }
      return data;
    }));

    return new Subject().asObservable().pipe(zip(objectSnapshot$, usedCat$),map(data => {
      console.log('--=--=--=-' + data);
      if (data[0] === null) {
        this.router.navigate(['/product-list']);
        return null;
      }
      return data;
    }));
  }
}