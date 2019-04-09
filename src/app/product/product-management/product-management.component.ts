import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { PROD_LIST_PAGE_SIZE } from '../products.tokens';
import { NoCounterService } from 'src/app/shared/no-counter.service';
import { ProductBulkUpdaterService } from './product-bulk-updater.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'poc-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  totalItemCnt: number = 0;
  pageNo: number = 1;
  pageSize: number;
  clickedHandler: {sell: () => void, stop: () => void};
  @ViewChild(ProductListComponent) productListComponent: ProductListComponent;

  constructor(private counter: NoCounterService,
              private productBulkUpdater: ProductBulkUpdaterService,
              private toastr: ToastrService,
              @Inject(PROD_LIST_PAGE_SIZE) pageSize: number) {
                console.log('productManagement COnst');
    this.pageSize = pageSize;
  }

  ngOnInit() {
    console.log('productManagementCompo OnInit');
    this.counter.get('product').subscribe(cnt => this.totalItemCnt = cnt);
    this.setBtnClickHandler();
  }

  pageNoChanged(pageNo) {
    this.pageNo = pageNo;
    this.productListComponent.pageNoChanged(this.pageNo);
  }

  pageSizeChanged(pageSize) {
    this.pageSize = +pageSize;
    this.productListComponent.pageSizeChanged(this.pageSize);
  }

  clickedBtn(btnEvent: string) {
    this.clickedHandler[btnEvent]();
  }

  private setBtnClickHandler() {
    const clickedSell = () => {
      this.productBulkUpdater.updateProductsToSell()
        .subscribe(
          (successIds) => {
            this.productListComponent.getPagedList();
            this.toastr.success(`Product Mod Success<br>ID: ${successIds.join(', ')}`, '[ProductManage]');
          },
          (e: Error) => {
            this.toastr.error(`Product Mod Fail<br>ID: ${e.message}`, '[ProductManage]')
          }
        );
    };
    const clickedStop = () => {
      this.productBulkUpdater.updateProductsToStop()
        .subscribe(
          (successIds) => {
            this.productListComponent.getPagedList();
            this.toastr.success(`Product Selling stop Modified success<br>ID: ${successIds.join(', ')}`, '[ProductManage]');
          },
          (e: Error) => {
            this.toastr.error(`Product selling stop modified fail<br>ID:${e.message}`, '[ProductManage]')
          }
        );
    };

    this.clickedHandler = {
      sell: clickedSell,
      stop: clickedStop
    };
  }
}