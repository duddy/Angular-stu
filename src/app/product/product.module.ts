import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ButtonGroupComponent } from './product-management/button-group/button-group.component';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { ProductListComponent } from './product-management/product-list/product-list.component';
import { PROD_LIST_PAGE_SIZE } from './products.tokens';
import { CheckedProductSetService } from './product-management/checked-product-set.service';
import { ProductBulkUpdaterService } from './product-management/product-bulk-updater.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductStatusPipe } from './product-status.pipe';

@NgModule({
  declarations: [ProductManagementComponent, ProductDetailComponent, ButtonGroupComponent, ProductListComponent, ProductStatusPipe],
  imports: [
    CommonModule, ProductRoutingModule, ReactiveFormsModule, FormsModule, ReactiveFormsModule, NgbPaginationModule
  ],
  providers: [CheckedProductSetService, ProductBulkUpdaterService, {provide: PROD_LIST_PAGE_SIZE, useValue: 6}]
})
export class ProductModule { }