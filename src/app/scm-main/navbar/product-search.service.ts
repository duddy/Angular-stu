import { Injectable } from '@angular/core';
import { DataStoreService } from 'src/app/shared/data-store.service';
import { Router } from '@angular/router';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {

  constructor(private database: DataStoreService, private router: Router) { }

  searchProduct(no: number) {
    console.log('onSerchProduct');
    return this.database.findObject$('product', no)
      .snapshotChanges().pipe(take(1),map(action => {console.log(action); return action.payload.val()}));
  }
}
