import { Injectable } from '@angular/core';
import { DataStoreService } from 'src/app/shared/data-store.service';
import { CheckedProductSetService } from './checked-product-set.service';
import { ProdStatus, Product } from '../product.model';
import { mergeMap, map, tap, reduce } from 'rxjs/operators';
import { DataSnapshot, DatabaseSnapshot, AngularFireAction } from '@angular/fire/database/interfaces';
import { Observable } from 'rxjs';

export declare type UpdateResult = [boolean, number];

@Injectable({
  providedIn: 'root'
})
export class ProductBulkUpdaterService {

  constructor(private database: DataStoreService, private prodSet: CheckedProductSetService) {
    console.log('ProductBulkUpdaterService');
   }

  updateProductsToSell() {
    return this.updateStatus(ProdStatus.ON_SALE);
  }

  updateProductsToStop() {
    return this.updateStatus(ProdStatus.NOT_FOR_SALE);
  }

  private updateStatus(status: ProdStatus) {
    const modifyProductFn = (prod: Product) => {
      prod.status = status;
      return prod;
    };

    return this._bulkUpdate(modifyProductFn);
  }

  private _bulkUpdate(updateFn: (Product) => Product) {
    const update$ = this.prodSet.nos$().pipe(
      mergeMap(no => this.database.findObjectSnapshot('product', no))).pipe(
      map((d: any) => {
        if( d.payload.exists() ) return d.payload.val();
        throw new Error('failed to fetch value');
      }),
      tap(updateFn),
      mergeMap(prod => this.database.update('product',prod).then(()=>[true, prod.no]).catch((e)=>[false, prod.no]))
    );
    return this.handleBulkUpdate$(update$);
  }

  private handleBulkUpdate$(update$: Observable<any>) {
    return update$.pipe(
      reduce((acc: any, r: UpdateResult) => {
        if ( r[0] ) {
          acc.success.push(r[1]);
        } else {
          acc.fail.push(r[1]);
        }
        return acc;
      },{success:[], fail:[]}),
      tap(result => { 
        if (result.fail.length > 0) {
          throw new Error(`${result.fail.join(',')}`);
        }
      }),
      map(result => result.success)
    );
  }
}
