import { Component, OnInit, Input, Inject } from '@angular/core';
import { Products } from '../../product.model';
import { ActivatedRoute } from '@angular/router';
import { DataStoreService } from 'src/app/shared/data-store.service';
import { Observable, range } from 'rxjs';
import { PROD_LIST_PAGE_SIZE } from '../../products.tokens';
import { map, tap } from 'rxjs/operators';
import { CheckedProductSetService } from '../checked-product-set.service';

@Component({
  selector: 'poc-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() totalItemCnt: number = 0;
  pageNo: number = 1;
  pageSize: number;
  products: Products;
  checkedStatus: boolean[];

  constructor(private route: ActivatedRoute,
              private prodSet: CheckedProductSetService,
              private database: DataStoreService,
              @Inject(PROD_LIST_PAGE_SIZE) pageSize: number) {
                console.log('productListComponent');
    this.pageSize = pageSize;
  }

  ngOnInit() {
    console.log('productListComponent init');
    this.fetchResolvedData();
    this.initCheckedProducts();
  }

  ngOnDestroy() {
    this.prodSet.initProdNos();
  }

  pageNoChanged(pageNo) {
    this.pageNo = pageNo;
    this.initCheckedProducts();
    this.getPagedList();
  }

  pageSizeChanged(pageSize) {
    this.pageSize = +pageSize;
    this.initCheckedProducts();
    this.getPagedList();
  }

  toggleAllItem() {
    if ( this.isCheckedAnyOne() ) {
      this.prodSet.initProdNos();
    }
    else {
      this.products.map(p => p.no)
        .forEach(no => this.prodSet.addNo(no));
    }

    this.setAllProductsCheckedStatusTo(!this.isCheckedAnyOne());
  }

  checkProduct(isChecked: boolean, idx: number, no: number) {
    this.checkedStatus[idx] = isChecked;

    if ( this.checkedStatus[idx] ) {
      this.prodSet.addNo(no);
    }
    else {
      this.prodSet.removeNo(no);
    }
  }

  isCheckedAnyOne() {
    return this.checkedStatus.reduce((acc, cur) => cur || acc, false);
  }

  getPagedList() {
    this.database.findList$ByPage('product', this.pageNo, this.pageSize, this.totalItemCnt).snapshotChanges().pipe(
      map(actions => actions.map(action => action.payload.val())),
      tap((list: Products) => list.sort((p1, p2) => p2.no - p1.no)))
      .subscribe(list => this.products = list);
  }

  /**
   * Resolveguardから　商品目録データを取得
   */
  private fetchResolvedData() {
    const resolvedData = <{list: Products}>this.route.snapshot.data;
    console.log(resolvedData);
    this.products = resolvedData.list;
  }

  /**
   * 全て商品のチェックボックスをfalseに初期化
   */
  private initCheckedProducts() {
    this.prodSet.initProdNos();
    this.setAllProductsCheckedStatusTo(false);
  }

  private setAllProductsCheckedStatusTo(v: boolean) {
    this.checkedStatus = [];

    const curItem = this.pageSize > this.totalItemCnt ? this.totalItemCnt : this.pageSize;
    range(0, curItem).subscribe(i => this.checkedStatus[i] = v);
  }
}
