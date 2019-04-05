import { Injectable, Inject } from '@angular/core';
import { DataStoreService } from 'src/app/shared/data-store.service';
import { CAT_LIST_PAGE_SIZE } from '../category.tokens';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { switchMap, tap, take } from 'rxjs/operators';
import { Categories } from '../category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryListResolverService implements Resolve<any> {

  constructor(private database: DataStoreService,
              @Inject(CAT_LIST_PAGE_SIZE) private pageSize: number) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.database.count('category').pipe(
      switchMap( cnt => this.database.findList$ByPage('category',1,this.pageSize,cnt).valueChanges() ),
      tap((list: Categories) => list.sort((p1, p2) => p2.no - p1.no)),
      take(1)
    );
  }
}
