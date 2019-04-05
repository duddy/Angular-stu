import { Injectable, Inject } from '@angular/core';
import { PROD_LIST_PAGE_SIZE } from '../../products.tokens';
import { DataStoreService } from 'src/app/shared/data-store.service';
import { tap, switchMap, take, map } from 'rxjs/operators';
import { Products } from '../../product.model';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductListResolverService implements Resolve<any> {

  constructor(private database: DataStoreService,
              @Inject(PROD_LIST_PAGE_SIZE) private pageSize: number) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.database.count('product').pipe(
      switchMap(cnt => this.database.findList$ByPage('product', 1, this.pageSize, cnt).snapshotChanges().pipe(
        take(1),
        map(actions => actions.map( action => action.payload.val()) ),
        tap((list: Products) => list.sort((p1, p2) => p2.no - p1.no))
      ))
      );
  }
}